#!/usr/bin/env bash
# Quick test to verify build works before deployment

set -e

echo "🔍 Testing build process locally..."
echo ""

cd "$(dirname "$0")/.."

echo "📦 Installing client dependencies..."
cd client
npm install

echo ""
echo "🏗️  Building client..."
npm run build

echo ""
echo "✅ Build successful!"
echo ""
echo "📂 Build output location: $(pwd)/dist"
echo ""
ls -lh dist/

echo ""
echo "📄 Files that will be deployed:"
find dist/ -type f | head -20

echo ""
echo "✅ Local build test passed! Ready for deployment."
echo ""
echo "Next steps:"
echo "1. Verify Plesk Git configuration (see PLESK_VERIFICATION_GUIDE.md)"
echo "2. Trigger deployment in Plesk, or"
echo "3. Upload dist/* to httpdocs/ via FTP"
