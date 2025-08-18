#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# start server in background
cd "$ROOT/server"
if pgrep -f "node index.js" >/dev/null; then
  echo "Server already running"
else
  nohup npm start > "$ROOT/server/server.out" 2>&1 &
  echo "Started server (logs: $ROOT/server/server.out)"
fi

# start client dev server in foreground
cd "$ROOT/client"
npm run dev
