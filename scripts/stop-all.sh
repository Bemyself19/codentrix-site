#!/usr/bin/env bash
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# stop server (by process name)
pkill -f "node index.js" || true
# stop vite (port 5174)
if command -v lsof >/dev/null 2>&1; then
  pids=$(lsof -t -i:5174 -sTCP:LISTEN || true)
  if [ -n "$pids" ]; then
    echo "Killing vite pids: $pids"
    kill $pids || true
  fi
fi

echo "Stopped processes if any were running"
