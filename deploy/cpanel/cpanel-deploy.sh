#!/usr/bin/env bash
# Runs on the cPanel host from .cpanel.yml (cwd = git repo working tree).
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
SITE="${DEPLOY_SITE:-$HOME/public_html}"
API="${DEPLOY_API:-$HOME/jsapp}"

# 1) static site (no rsync on this host): replace what we own, keep host-managed files
KEEP=" .htaccess cgi-bin .well-known api php.ini .user.ini error_log "
SKIP=" _server _deploy .git .cpanel.yml "
shopt -s dotglob nullglob
declare -A NEWSET
for e in "$SRC"/*; do n="$(basename "$e")"; case "$SKIP" in *" $n "*) continue;; esac; NEWSET[$n]=1; done
# remove stale top-level entries (old zips, node_modules, previous hashed assets dir ...)
for e in "$SITE"/*; do
  n="$(basename "$e")"
  case "$KEEP" in *" $n "*) continue;; esac
  rm -rf "$e"
done
for n in "${!NEWSET[@]}"; do cp -a "$SRC/$n" "$SITE/$n"; done

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
