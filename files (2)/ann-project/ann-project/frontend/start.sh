#!/bin/bash

echo "🚀 Starting ANN Frontend..."

# Node modules 설치
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# 개발 서버 실행
echo "Starting Next.js development server..."
npm run dev
