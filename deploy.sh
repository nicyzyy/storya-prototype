#!/bin/bash
cd "$(dirname "$0")"
npm run build
git add -A
git commit -m "${1:-update: prototype changes}"
git push origin main
echo "✅ Pushed to GitHub — Render will auto-deploy in ~1-2 minutes"
echo "🔗 https://storya-prototype.onrender.com"
