#!/usr/bin/env node
/**
 * Brand-asset regression checks (no dependencies, runs in CI before the build).
 *
 * Guards the things that silently broke the last logo swap:
 *  - the dark navigation must actually prefer the approved white SVG, with the
 *    matching PNG as the only raster fallback (a stale .webp won before);
 *  - the retired logo-dark.* sources must not come back, anywhere in client/;
 *  - favicon / Apple / Open Graph artwork must exist at the sizes index.html
 *    and the meta tags promise;
 *  - the approved white master must stay all-white and keep its 914x209 canvas;
 *  - the decorative oversized footer wordmark is live text and must stay.
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const client = resolve(here, '..')
const root = resolve(client, '..')
const publicDir = join(client, 'public')

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

/** Read width/height from a PNG's IHDR chunk without any image library. */
function pngSize(path) {
  assert(existsSync(path), `missing file ${path.replace(root + '/', '')}`)
  const buf = readFileSync(path)
  assert(buf.slice(1, 4).toString('ascii') === 'PNG', `${path} is not a PNG`)
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
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
  assert(
    !/logo-dark/.test(navBar),
    'NavBar still references the retired logo-dark.* assets'
  )
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
  for (const rel of sources) {
    const text = readFileSync(join(client, rel), 'utf8')
    assert(!/logo-dark/.test(text), `${rel} still references logo-dark.*`)
  }
})

check('white lockup keeps the approved canvas and colour', () => {
  assert(/width="914"\s+height="209"/.test(whiteSvg), 'white SVG canvas is not 914x209')
  assert(/viewBox="0 0 914 209"/.test(whiteSvg), 'white SVG viewBox is not 0 0 914 209')
  for (const id of ['frame', 'code-bracket', 'gear']) {
    assert(whiteSvg.includes(`id="${id}"`), `white SVG is missing the "${id}" group`)
  }
  const fills = [...whiteSvg.matchAll(/(?:fill|stroke)="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1].toUpperCase())
  assert(fills.length > 0, 'white SVG declares no explicit fills')
  const offColour = [...new Set(fills)].filter((c) => c !== '#FFFFFF')
  assert(offColour.length === 0, `white SVG contains non-white ink: ${offColour.join(', ')}`)
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

check('favicon, Apple touch icon and OG card exist at declared sizes', () => {
  const fav = pngSize(join(publicDir, 'favicon.png'))
  assert(fav.width === 64 && fav.height === 64, `favicon.png is ${fav.width}x${fav.height}, expected 64x64`)
  const apple = pngSize(join(publicDir, 'apple-touch-icon.png'))
  assert(
    apple.width === 180 && apple.height === 180,
    `apple-touch-icon.png is ${apple.width}x${apple.height}, expected 180x180`
  )
  const og = pngSize(join(publicDir, 'og-image.png'))
  assert(og.width === 1200 && og.height === 630, `og-image.png is ${og.width}x${og.height}, expected 1200x630`)
  assert(existsSync(join(publicDir, 'favicon.svg')), 'missing favicon.svg')
  const png = pngSize(join(publicDir, 'brand/codentrix-logo-white.png'))
  assert(
    png.width / png.height > 4.3 && png.width / png.height < 4.45,
    `raster logo ${png.width}x${png.height} does not match the 914x209 master`
  )
  assert(statSync(join(publicDir, 'brand/codentrix-logo-white.svg')).size > 1000, 'white SVG looks empty')
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
  for (const rel of [
    'brand/codentrix-logo-white.svg',
    'brand/codentrix-logo-white.png',
    'favicon.svg',
    'favicon.png',
    'apple-touch-icon.png',
    'og-image.png'
  ]) {
    assert(existsSync(join(dist, rel)), `dist/${rel} is missing`)
  }
  assert(!existsSync(join(dist, 'logo-dark.webp')), 'dist still ships logo-dark.webp')
})

for (const name of passes) console.log(`PASS  ${name}`)
for (const name of skipped) console.log(`SKIP  ${name} (run npm run build first)`)
for (const failure of failures) console.error(`FAIL  ${failure}`)
console.log(`\n${passes.length} passed, ${skipped.length} skipped, ${failures.length} failed`)
if (failures.length) process.exit(1)
