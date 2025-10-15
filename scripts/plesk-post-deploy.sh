#!/usr/bin/env bash
set -euo pipefail

# Plesk post-deploy script
# Place this script in the repository and configure Plesk Git post-deploy to run:
#   sh scripts/plesk-post-deploy.sh
# It will build the client and copy the production files into `httpdocs`.

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
echo "Repository root: $REPO_ROOT"

cd "$REPO_ROOT"

echo "--- Building client ---"
if [ -f client/package.json ]; then
  npm --prefix client ci --no-audit --no-fund
  npm --prefix client run build
else
  echo "No client/package.json found, skipping client build"
fi

echo "--- Deploying build to httpdocs ---"
if [ -d client/dist ]; then
  # Ensure httpdocs exists
  mkdir -p httpdocs

  # Remove previous public files but keep dotfiles (like .htaccess) if present
  shopt -s extglob
  if [ -d httpdocs ]; then
    echo "Removing previous files in httpdocs (excluding dotfiles)"
    rm -rf httpdocs/!(*.ssh*|.|..|.htaccess 2>/dev/null) || true
  fi

  echo "Copying client/dist -> httpdocs/"
  cp -r client/dist/* httpdocs/
else
  echo "Build output client/dist not found - nothing to copy"
fi

echo "--- Installing server dependencies (if any) ---"
if [ -f server/package.json ]; then
  npm --prefix server ci --no-audit --no-fund
else
  echo "No server/package.json found, skipping server install"
fi

echo "Post-deploy finished. IMPORTANT: restart the Node app from Plesk (Applications > Node.js > Restart App) or restart your process manager (pm2/systemd) if used."

exit 0
