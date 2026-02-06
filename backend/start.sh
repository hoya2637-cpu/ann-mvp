#!/bin/bash

echo "🚀 Starting ANN Backend..."

# Python 가상환경 확인
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# 가상환경 활성화
source venv/bin/activate

# 의존성 설치
echo "Installing dependencies..."
pip install -r requirements.txt

# 서버 실행
echo "Starting FastAPI server..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
