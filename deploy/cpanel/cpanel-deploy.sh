#!/usr/bin/env bash
# Runs on the cPanel host from .cpanel.yml (cwd = git repo working tree).
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
SITE="${DEPLOY_SITE:-$HOME/public_html}"
API="${DEPLOY_API:-$HOME/jsapp}"

# 1) static site: replace everything we own, keep host-managed files
rsync -a --delete \
  --exclude '/_server/' --exclude '/_deploy/' --exclude '/.git' --exclude '/.cpanel.yml' \
  --exclude '/.htaccess' --exclude '/cgi-bin/' --exclude '/.well-known/' --exclude '/api/' \
  --exclude '/php.ini' --exclude '/.user.ini' --exclude '/error_log' \
  "$SRC/" "$SITE/"

# 2) .htaccess: keep CloudLinux/cPanel managed blocks, replace the rest with ours
OLD="$SITE/.htaccess"; NEW="$(mktemp)"
if [ -f "$OLD" ]; then
  awk '/CLOUDLINUX PASSENGER CONFIGURATION BEGIN/,/CLOUDLINUX PASSENGER CONFIGURATION END/' "$OLD" >> "$NEW"
  awk '/CLOUDLINUX ENV VARS CONFIGURATION BEGIN/,/CLOUDLINUX ENV VARS CONFIGURATION END/' "$OLD" >> "$NEW"
fi
cat "$SRC/_deploy/htaccess.site" >> "$NEW"
if [ -f "$OLD" ]; then
  awk '/# php -- BEGIN cPanel-generated handler/,/# php -- END cPanel-generated handler/' "$OLD" >> "$NEW"
fi
cp "$NEW" "$OLD"; rm -f "$NEW"

# 3) API: single-file bundle, keep .env and Node-selector files
mkdir -p "$API/tmp"
cp "$SRC/_server/index.js" "$API/index.js"
cp "$SRC/_server/package.json" "$API/package.json"
touch "$API/tmp/restart.txt"

cp "$SRC/_deploy/SOURCE_SHA" "$SITE/version.txt"
echo "deployed $(cat "$SRC/_deploy/SOURCE_SHA")"
