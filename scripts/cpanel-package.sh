#!/usr/bin/env bash
# Build the deployable artifact for cPanel into ./out
#   out/                site root (client build + .htaccess)
#   out/_server/        bundled Express API (single file, no node_modules)
#   out/_deploy/        cpanel-deploy.sh, executed by .cpanel.yml on the host
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/out"
rm -rf "$OUT"; mkdir -p "$OUT/_server" "$OUT/_deploy"

( cd "$ROOT/client" && npm ci --no-audit --no-fund && npm run build )
cp -R "$ROOT/client/dist/." "$OUT/"
# strip dev leftovers that older client/public folders still carry
rm -f "$OUT"/package.json "$OUT"/package-lock.json "$OUT"/*.bak "$OUT"/*.xcf "$OUT"/*.zip "$OUT"/ahmed-orig.jpg

( cd "$ROOT/server" && npm ci --no-audit --no-fund --omit=dev )
( cd "$ROOT/server" && npx --yes esbuild@0.24 index.js --bundle --platform=node --target=node18 \
    --outfile="$OUT/_server/index.js" --log-level=warning )
cp "$ROOT/deploy/cpanel/package.json" "$OUT/_server/package.json"

cp "$ROOT/deploy/cpanel/htaccess.site" "$OUT/_deploy/htaccess.site"
cp "$ROOT/deploy/cpanel/cpanel-deploy.sh" "$OUT/_deploy/cpanel-deploy.sh"
cp "$ROOT/deploy/cpanel/.cpanel.yml" "$OUT/.cpanel.yml"
git -C "$ROOT" rev-parse HEAD > "$OUT/_deploy/SOURCE_SHA" 2>/dev/null || echo unknown > "$OUT/_deploy/SOURCE_SHA"
cp "$OUT/_deploy/SOURCE_SHA" "$OUT/version.txt"
echo "artifact ready: $OUT"
