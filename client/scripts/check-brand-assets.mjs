#!/usr/bin/env node
/**
 * Brand-asset regression checks (no dependencies, runs in CI before the build).
 *
 * Guards the things that silently broke the last two logo swaps:
 *  - the dark navigation must actually prefer the approved white SVG, with the
 *    matching PNG as the only raster fallback (a stale .webp won before);
 *  - the retired logo-dark.* sources must not come back, anywhere in client/;
 *  - favicon / Apple / Open Graph artwork must exist at the sizes index.html
 *    and the meta tags promise, in the expected format and palette;
 *  - transparent rasters must carry STRAIGHT alpha: every visibly transparent
 *    pixel keeps its ink colour. The approved FINAL master PNG is premultiplied
 *    (RGB == A on all 2229 sampled anti-aliased pixels), so compositing it as if
 *    it were straight alpha dimmed every edge of the nav fallback, favicon and OG
 *    card in the first pass. These checks fail loudly if that returns;
 *  - the approved white master must stay all-white, keep its 914x209 canvas and
 *    keep its pinned hash; the colour lockup must stay in the approved palette;
 *  - the decorative oversized footer wordmark is live text and must stay.
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inflateSync } from 'node:zlib'

const here = dirname(fileURLToPath(import.meta.url))
const client = resolve(here, '..')
const root = resolve(client, '..')
const publicDir = join(client, 'public')

// Approved option-B masters (Marketing/Logo_Restoration/rollout/approved_master_hashes.json).
const WHITE_MASTER_SHA256 = '954164bc600399084c86c7d53b1a7bd8c962c99b89f9fca264561b368d8b0816'
const NAVY = [0x10, 0x2d, 0x4a] // #102D4A frame / bracket / wordmark
const GEAR_BLUE = [0x29, 0x6f, 0xb4] // #296FB4 gear only
const CANVAS = [0x0b, 0x0f, 0x17] // #0B0F17 site canvas

const failures = []
const passes = []
const skipped = []

function check(name, fn) {
  try {
    const outcome = fn()
    if (outcome === 'skipped') skipped.push(name)
    else passes.push(name)
  } catch (error) {
    failures.push(`${name}: ${error.message}`)
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function read(path) {
  assert(existsSync(path), `missing file ${path.replace(root + '/', '')}`)
  return readFileSync(path, 'utf8')
}

const rel = (path) => path.replace(root + '/', '')

/**
 * Minimal PNG reader: 8-bit truecolour (2) or truecolour+alpha (6), non-interlaced -
 * what every browser and image exporter emits for these assets. Returns RGBA pixels
 * so the checks can assert on format, size, palette and alpha without a dependency.
 */
function readPng(path) {
  assert(existsSync(path), `missing file ${rel(path)}`)
  const buf = readFileSync(path)
  assert(buf.slice(1, 4).toString('ascii') === 'PNG', `${rel(path)} is not a PNG`)
  assert(buf.slice(12, 16).toString('ascii') === 'IHDR', `${rel(path)} has no IHDR`)

  const width = buf.readUInt32BE(16)
  const height = buf.readUInt32BE(20)
  const bitDepth = buf[24]
  const colorType = buf[25]
  const interlace = buf[28]
  assert(bitDepth === 8, `${rel(path)} is ${bitDepth}-bit, expected 8-bit`)
  assert(colorType === 2 || colorType === 6, `${rel(path)} colour type ${colorType} is not RGB/RGBA`)
  assert(interlace === 0, `${rel(path)} is interlaced`)

  const chunks = []
  for (let offset = 8; offset < buf.length; ) {
    const length = buf.readUInt32BE(offset)
    const type = buf.slice(offset + 4, offset + 8).toString('ascii')
    if (type === 'IDAT') chunks.push(buf.slice(offset + 8, offset + 8 + length))
    offset += 12 + length
  }
  assert(chunks.length > 0, `${rel(path)} has no IDAT`)
  const raw = inflateSync(Buffer.concat(chunks))

  const channels = colorType === 6 ? 4 : 3
  const stride = width * channels
  const pixels = Buffer.alloc(width * height * 4)
  let previous = Buffer.alloc(stride)

  for (let y = 0; y < height; y++) {
    const start = y * (stride + 1)
    const filter = raw[start]
    const line = Buffer.from(raw.slice(start + 1, start + 1 + stride))
    for (let i = 0; i < stride; i++) {
      const left = i >= channels ? line[i - channels] : 0
      const up = previous[i]
      const upLeft = i >= channels ? previous[i - channels] : 0
      switch (filter) {
        case 0:
          break
        case 1:
          line[i] = (line[i] + left) & 0xff
          break
        case 2:
          line[i] = (line[i] + up) & 0xff
          break
        case 3:
          line[i] = (line[i] + ((left + up) >> 1)) & 0xff
          break
        case 4: {
          const estimate = left + up - upLeft
          const pa = Math.abs(estimate - left)
          const pb = Math.abs(estimate - up)
          const pc = Math.abs(estimate - upLeft)
          line[i] = (line[i] + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft)) & 0xff
          break
        }
        default:
          throw new Error(`${rel(path)} uses unsupported PNG filter ${filter}`)
      }
    }
    for (let x = 0; x < width; x++) {
      const from = x * channels
      const to = (y * width + x) * 4
      pixels[to] = line[from]
      pixels[to + 1] = line[from + 1]
      pixels[to + 2] = line[from + 2]
      pixels[to + 3] = channels === 4 ? line[from + 3] : 255
    }
    previous = line
  }

  const at = (x, y) => {
    const i = (y * width + x) * 4
    return [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]
  }

  return { path: rel(path), width, height, colorType, pixels, at }
}

const near = (rgb, target, tolerance) =>
  Math.abs(rgb[0] - target[0]) <= tolerance &&
  Math.abs(rgb[1] - target[1]) <= tolerance &&
  Math.abs(rgb[2] - target[2]) <= tolerance

/**
 * Walk pixels at or above `minAlpha`. Browsers leave the RGB of almost entirely
 * transparent pixels unconstrained (a=1 can carry any colour), so palette checks
 * only look at pixels that can actually be seen.
 */
function eachVisible(image, minAlpha, fn) {
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const pixel = image.at(x, y)
      if (pixel[3] >= minAlpha) fn(pixel, x, y)
    }
  }
}

function countVisible(image, predicate, minAlpha = 1) {
  let count = 0
  eachVisible(image, minAlpha, (pixel) => {
    if (predicate(pixel)) count++
  })
  return count
}

/** Collect a few offending pixels so a failure names the actual colour. */
function offenders(image, predicate, minAlpha, limit = 4) {
  const found = []
  eachVisible(image, minAlpha, (pixel, x, y) => {
    if (found.length < limit && !predicate(pixel)) found.push(`(${x},${y})=${pixel.join(',')}`)
  })
  return found
}

const navBar = read(join(client, 'src/components/layout/NavBar.jsx'))
const indexHtml = read(join(client, 'index.html'))
const footer = read(join(client, 'src/components/layout/Footer.jsx'))
const footerCss = read(join(client, 'src/components/layout/footer.css'))
const whiteSvg = read(join(publicDir, 'brand/codentrix-logo-white.svg'))

check('navigation prefers the approved white SVG', () => {
  assert(
    /<source\s+srcSet="\/brand\/codentrix-logo-white\.svg"\s+type="image\/svg\+xml"/.test(navBar),
    'NavBar does not declare an SVG <source> for /brand/codentrix-logo-white.svg'
  )
  assert(
    /src="\/brand\/codentrix-logo-white\.png"/.test(navBar),
    'NavBar img fallback is not /brand/codentrix-logo-white.png'
  )
  assert(!/logo-dark/.test(navBar), 'NavBar still references the retired logo-dark.* assets')
})

check('retired logo assets and references are gone', () => {
  for (const stale of ['logo-dark.webp', 'logo-dark.png']) {
    assert(!existsSync(join(publicDir, stale)), `client/public/${stale} still exists`)
  }
  const sources = [
    'src/components/layout/NavBar.jsx',
    'src/components/layout/Footer.jsx',
    'index.html',
    'src/App.jsx',
    'src/main.jsx'
  ]
  for (const file of sources) {
    const text = readFileSync(join(client, file), 'utf8')
    assert(!/logo-dark/.test(text), `${file} still references logo-dark.*`)
  }
})

check('white lockup keeps the approved canvas, colour and master hash', () => {
  assert(/width="914"\s+height="209"/.test(whiteSvg), 'white SVG canvas is not 914x209')
  assert(/viewBox="0 0 914 209"/.test(whiteSvg), 'white SVG viewBox is not 0 0 914 209')
  for (const id of ['frame', 'code-bracket', 'gear']) {
    assert(whiteSvg.includes(`id="${id}"`), `white SVG is missing the "${id}" group`)
  }
  const fills = [...whiteSvg.matchAll(/(?:fill|stroke)="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1].toUpperCase())
  assert(fills.length > 0, 'white SVG declares no explicit fills')
  const offColour = [...new Set(fills)].filter((c) => c !== '#FFFFFF')
  assert(offColour.length === 0, `white SVG contains non-white ink: ${offColour.join(', ')}`)
  const hash = createHash('sha256')
    .update(readFileSync(join(publicDir, 'brand/codentrix-logo-white.svg')))
    .digest('hex')
  assert(
    hash === WHITE_MASTER_SHA256,
    `brand/codentrix-logo-white.svg differs from the approved master (sha256 ${hash})`
  )
})

check('nav logo box matches the master aspect ratio', () => {
  const width = Number(navBar.match(/width="(\d+)"/)?.[1])
  const height = Number(navBar.match(/height="(\d+)"/)?.[1])
  assert(width && height, 'NavBar logo width/height attributes are missing')
  const boxRatio = width / height
  const masterRatio = 914 / 209
  assert(
    Math.abs(boxRatio - masterRatio) / masterRatio < 0.01,
    `logo box ${width}x${height} distorts the 914x209 master`
  )
})

check('nav raster fallback is 840x192 with straight-alpha white ink', () => {
  const png = readPng(join(publicDir, 'brand/codentrix-logo-white.png'))
  assert(png.colorType === 6, `logo fallback is colour type ${png.colorType}, expected RGBA`)
  assert(
    png.width === 840 && png.height === 192,
    `logo fallback is ${png.width}x${png.height}, expected 840x192 (6x the 140x32 nav box)`
  )
  for (const [x, y] of [
    [0, 0],
    [png.width - 1, 0],
    [0, png.height - 1],
    [png.width - 1, png.height - 1]
  ]) {
    assert(png.at(x, y)[3] === 0, `logo fallback corner (${x},${y}) is not transparent`)
  }
  const dimmed = offenders(png, (p) => p[0] === 255 && p[1] === 255 && p[2] === 255, 1)
  assert(
    dimmed.length === 0,
    `logo fallback carries non-white ink on visible pixels (premultiplied alpha?) e.g. ${dimmed.join(' ')}`
  )
  const soft = countVisible(png, (p) => p[3] > 0 && p[3] < 255, 1)
  assert(soft > 1000, `logo fallback has only ${soft} anti-aliased pixels; edges look hard-aliased`)
})

check('colour email lockup is a transparent 640px PNG in the approved palette', () => {
  const png = readPng(join(publicDir, 'brand/codentrix-logo-colour-email.png'))
  assert(png.colorType === 6, `email lockup is colour type ${png.colorType}, expected RGBA`)
  assert(png.width === 640, `email lockup is ${png.width}px wide, expected 640`)
  assert(
    Math.abs(png.height - Math.round((640 * 209) / 914)) <= 1,
    `email lockup is ${png.width}x${png.height}, which is not the 914x209 aspect ratio`
  )
  assert(png.at(0, 0)[3] === 0, 'email lockup corner is not transparent')
  const allowed = (p) => near(p, NAVY, 8) || near(p, GEAR_BLUE, 8)
  const wrong = offenders(png, allowed, 32)
  assert(
    wrong.length === 0,
    `email lockup has off-palette ink (only #102D4A and gear #296FB4 are approved; premultiplied data dims it) e.g. ${wrong.join(' ')}`
  )
  assert(countVisible(png, (p) => near(p, NAVY, 2), 200) > 5000, 'email lockup is missing the navy ink')
  assert(countVisible(png, (p) => near(p, GEAR_BLUE, 2), 200) > 200, 'email lockup is missing the gear blue')
  // Signature asset, not a site asset: nothing on the page may reference it until
  // production use is approved separately.
  for (const file of ['index.html', 'src/components/layout/Footer.jsx', 'src/components/layout/NavBar.jsx']) {
    assert(
      !readFileSync(join(client, file), 'utf8').includes('codentrix-logo-colour-email'),
      `${file} references the email lockup; it stays unlinked until signatures are approved`
    )
  }
})

check('favicon raster is a 64px navy plate with a clean straight-alpha edge', () => {
  const png = readPng(join(publicDir, 'favicon.png'))
  assert(png.colorType === 6, `favicon.png is colour type ${png.colorType}, expected RGBA`)
  assert(png.width === 64 && png.height === 64, `favicon.png is ${png.width}x${png.height}, expected 64x64`)
  assert(png.at(0, 0)[3] === 0, 'favicon.png corner is not transparent (the plate lost its radius)')
  assert(
    countVisible(png, (p) => p[0] === 255 && p[1] === 255 && p[2] === 255, 200) > 100,
    'favicon.png has no white mark'
  )
  const plate = countVisible(png, (p) => near(p, NAVY, 3), 250)
  assert(plate > 2000, `favicon.png navy plate covers only ${plate} pixels`)
  // Anti-aliased plate edge must stay navy; premultiplied data would darken it towards black.
  const darkened = offenders(
    png,
    (p) => p[0] >= NAVY[0] - 8 && p[1] >= NAVY[1] - 8 && p[2] >= NAVY[2] - 8,
    32
  )
  assert(darkened.length === 0, `favicon.png has darkened edge pixels e.g. ${darkened.join(' ')}`)
  assert(
    countVisible(png, (p) => p[3] > 0 && p[3] < 255, 1) > 10,
    'favicon.png plate is hard-aliased; the rounded corners need anti-aliasing'
  )
})

check('favicon.svg mirrors the raster plate and mark', () => {
  const svg = read(join(publicDir, 'favicon.svg'))
  assert(/viewBox="0 0 64 64"/.test(svg), 'favicon.svg viewBox is not 0 0 64 64')
  assert(/<rect[^>]*rx="14"/.test(svg) && svg.includes('#102D4A'), 'favicon.svg lost its navy rounded plate')
  for (const id of ['frame', 'code-bracket', 'gear']) {
    assert(svg.includes(`id="${id}"`), `favicon.svg is missing the "${id}" group`)
  }
  assert(!/#(?!FFFFFF)[0-9A-Fa-f]{6}/i.test(svg.replace(/fill="#102D4A"/gi, '')), 'favicon.svg uses ink other than white on navy')
})

check('Apple touch icon is an opaque 180px navy tile', () => {
  const png = readPng(join(publicDir, 'apple-touch-icon.png'))
  assert(
    png.width === 180 && png.height === 180,
    `apple-touch-icon.png is ${png.width}x${png.height}, expected 180x180`
  )
  const notOpaque = countVisible(png, (p) => p[3] !== 255, 0)
  assert(notOpaque === 0, `apple-touch-icon.png has ${notOpaque} non-opaque pixels; iOS needs an opaque tile`)
  assert(near(png.at(0, 0), NAVY, 3), `apple-touch-icon.png corner is ${png.at(0, 0).join(',')}, expected navy`)
  assert(
    countVisible(png, (p) => p[0] === 255 && p[1] === 255 && p[2] === 255, 255) > 1000,
    'apple-touch-icon.png has no white mark'
  )
})

check('Open Graph card is an opaque 1200x630 canvas with the white lockup', () => {
  const png = readPng(join(publicDir, 'og-image.png'))
  assert(png.width === 1200 && png.height === 630, `og-image.png is ${png.width}x${png.height}, expected 1200x630`)
  const notOpaque = countVisible(png, (p) => p[3] !== 255, 0)
  assert(notOpaque === 0, `og-image.png has ${notOpaque} non-opaque pixels`)
  assert(near(png.at(4, 4), CANVAS, 6), `og-image.png corner is ${png.at(4, 4).join(',')}, expected the #0B0F17 canvas`)
  assert(
    countVisible(png, (p) => p[0] === 255 && p[1] === 255 && p[2] === 255, 255) > 5000,
    'og-image.png has no white lockup'
  )
})

check('index.html advertises the new icon and OG artwork', () => {
  assert(/rel="icon"[^>]*href="\/favicon\.svg"/.test(indexHtml), 'favicon.svg is not linked')
  assert(/rel="icon"[^>]*href="\/favicon\.png"/.test(indexHtml), 'favicon.png fallback is not linked')
  assert(/rel="apple-touch-icon"[^>]*href="\/apple-touch-icon\.png"/.test(indexHtml), 'apple-touch-icon is not linked')
  assert(/property="og:image"\s+content="\/og-image\.png"/.test(indexHtml), 'og:image is not /og-image.png')
  assert(/property="og:image:width"\s+content="1200"/.test(indexHtml), 'og:image:width is not 1200')
  assert(/property="og:image:height"\s+content="630"/.test(indexHtml), 'og:image:height is not 630')
})

check('decorative footer wordmark is still live text', () => {
  assert(
    /className="footer-wordmark"\s+aria-hidden="true">\s*Codentrix\s*</.test(footer),
    'Footer decorative wordmark markup changed'
  )
  assert(/\.footer-wordmark\s*\{/.test(footerCss), 'footer.css no longer styles .footer-wordmark')
})

check('built artifact carries the brand assets', () => {
  const dist = join(client, 'dist')
  if (!existsSync(dist)) return 'skipped'
  for (const file of [
    'brand/codentrix-logo-white.svg',
    'brand/codentrix-logo-white.png',
    'brand/codentrix-logo-colour-email.png',
    'favicon.svg',
    'favicon.png',
    'apple-touch-icon.png',
    'og-image.png'
  ]) {
    assert(existsSync(join(dist, file)), `dist/${file} is missing`)
  }
  assert(!existsSync(join(dist, 'logo-dark.webp')), 'dist still ships logo-dark.webp')
  assert(
    statSync(join(dist, 'brand/codentrix-logo-white.svg')).size > 1000,
    'dist white lockup SVG looks empty'
  )
  assert(
    statSync(join(dist, 'brand/codentrix-logo-colour-email.png')).size > 1000,
    'dist email lockup looks empty'
  )
})

for (const name of passes) console.log(`PASS  ${name}`)
for (const name of skipped) console.log(`SKIP  ${name} (run npm run build first)`)
for (const failure of failures) console.error(`FAIL  ${failure}`)
console.log(`\n${passes.length} passed, ${skipped.length} skipped, ${failures.length} failed`)
if (failures.length) process.exit(1)
