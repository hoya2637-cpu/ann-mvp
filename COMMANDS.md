# ANN 개발 명령어 모음 (Copy & Paste)

## 🚀 초기 설정 (처음 한 번만)

### 1. PostgreSQL 설치 및 설정

```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# Ubuntu/Linux
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows (WSL)
sudo apt-get install postgresql
sudo service postgresql start

# DB 생성
psql postgres <<EOF
CREATE DATABASE ann;
CREATE USER ann WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE ann TO ann;
\q
EOF
```

### 2. Backend 설정

```bash
cd backend

# 가상환경 생성
python3 -m venv venv

# 가상환경 활성화
source venv/bin/activate  # macOS/Linux
# 또는
venv\Scripts\activate     # Windows

# 패키지 업데이트
pip install --upgrade pip

# 의존성 설치
pip install fastapi uvicorn[standard] pydantic sqlalchemy psycopg2-binary openai python-dotenv

# requirements.txt 생성
pip freeze > requirements.txt

# .env 파일 생성
cat > .env << 'EOF'
OPENAI_API_KEY=sk-proj-your-api-key-here
DATABASE_URL=postgresql://ann:password@localhost:5432/ann
EOF

# DB 테이블 생성
cat > init_db.py << 'EOF'
from app.database import engine, Base
from app.models.news import News
from app.models.credibility import CredibilityIndex
from app.models.comment import Comment
from app.models.user import User
from app.models.log import FactCheckLog

def init_database():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Database initialized!")

if __name__ == "__main__":
    init_database()
EOF

python init_db.py
```

### 3. Frontend 설정

```bash
cd ../frontend

# Node.js 패키지 설치
npm install

# .env.local 생성
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
```

---

## 🏃 일상적인 개발 (매일)

### Backend 실행

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

또는 한 줄로:
```bash
cd backend && source venv/bin/activate && uvicorn app.main:app --reload
```

### Frontend 실행 (새 터미널)

```bash
cd frontend
npm run dev
```

---

## 🧪 테스트 명령어

### 1. Backend API 테스트

```bash
# Health Check
curl http://localhost:8000/

# Fact Check (기본)
curl -X POST http://localhost:8000/fact-check/ \
  -H "Content-Type: application/json" \
  -d '{"query": "The Earth is round"}'

# Fact Check (다양한 예제)
curl -X POST http://localhost:8000/fact-check/ \
  -H "Content-Type: application/json" \
  -d '{"query": "COVID-19 vaccines cause autism"}'

curl -X POST http://localhost:8000/fact-check/ \
  -H "Content-Type: application/json" \
  -d '{"query": "Tesla stock will reach $500"}'

# 댓글 추가
curl -X POST http://localhost:8000/comments/ \
  -H "Content-Type: application/json" \
  -d '{
    "news_id": 1,
    "user": "TestUser",
    "content": "I disagree with this analysis",
    "is_expert": false
  }'

# 댓글 조회
curl http://localhost:8000/comments/1

# Fact Check 히스토리
curl http://localhost:8000/fact-check/history

# Admin - 가중치 조회
curl http://localhost:8000/admin/experts/weights
```

### 2. Swagger UI로 테스트

브라우저에서:
```
http://localhost:8000/docs
```

### 3. Database 직접 조회

```bash
psql -U ann -d ann

# 테이블 목록
\dt

# 뉴스 조회
SELECT * FROM news;

# Credibility Index 조회
SELECT * FROM credibility_index;

# 댓글 조회
SELECT * FROM comments;

# Fact Check 로그
SELECT * FROM fact_check_logs;

# 종료
\q
```

---

## 🔧 LLM 연동 구현

### 1. LLM 서비스 파일 생성

```bash
cd backend/app/services

cat > llm_service.py << 'EOF'
import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def analyze_claim_with_ai(claim: str) -> dict:
    system_prompt = """당신은 팩트체커입니다.
    0-100점 신뢰도 점수를 매기세요.
    JSON 형식: {"score": 85, "reasoning": "...", "category": "politics"}"""
    
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"팩트체크: {claim}"}
        ],
        temperature=0.3,
        response_format={"type": "json_object"}
    )
    
    import json
    result = json.loads(response.choices[0].message.content)
    
    return {
        "score": result.get("score", 50),
        "reasoning": result.get("reasoning", "분석 중..."),
        "category": result.get("category", "general")
    }
EOF
```

### 2. Fact Check API 업데이트

```bash
cat > ../routes/fact_check.py << 'EOF'
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import SessionLocal
from app.models.news import News
from app.models.credibility import CredibilityIndex
from app.models.log import FactCheckLog
from app.services.credibility_engine import calculate_credibility
from app.services.llm_service import analyze_claim_with_ai

router = APIRouter(prefix="/fact-check", tags=["Fact Check"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class FactCheckRequest(BaseModel):
    query: str

@router.post("/")
async def fact_check(request: FactCheckRequest, db: Session = Depends(get_db)):
    # AI 분석
    ai_result = await analyze_claim_with_ai(request.query)
    
    # 점수 계산
    final_score = calculate_credibility(
        ai_result["score"], 60, 50, 75
    )
    
    # DB 저장
    news = News(
        title=request.query[:100],
        source="user",
        content=request.query,
        base_ai_score=ai_result["score"]
    )
    db.add(news)
    db.commit()
    db.refresh(news)
    
    return {
        "query": request.query,
        "news_id": news.id,
        "credibility_score": final_score,
        "components": {
            "ai_score": ai_result["score"],
            "ai_reasoning": ai_result["reasoning"]
        }
    }
EOF
```

### 3. 테스트

```bash
# 서버 재시작
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# 새 터미널에서 테스트
curl -X POST http://localhost:8000/fact-check/ \
  -H "Content-Type: application/json" \
  -d '{"query": "The moon landing was faked"}'

# 다른 점수가 나오는지 확인!
```

---

## 🐛 문제 해결

### Backend 포트 이미 사용 중

```bash
# 8000번 포트 사용 중인 프로세스 찾기
lsof -i :8000

# 프로세스 종료
kill -9 <PID>

# 또는 다른 포트 사용
uvicorn app.main:app --reload --port 8001
```

### Frontend 포트 이미 사용 중

```bash
# 3000번 포트 사용 중인 프로세스 찾기
lsof -i :3000

# 프로세스 종료
kill -9 <PID>

# 또는 다른 포트 사용
npm run dev -- -p 3001
```

### Database 연결 오류

```bash
# PostgreSQL 실행 중인지 확인
pg_isready

# 안 되면 재시작
brew services restart postgresql@14  # macOS
sudo systemctl restart postgresql    # Linux

# 연결 테스트
psql -U ann -d ann -c "SELECT 1;"
```

### OpenAI API 키 오류

```bash
# .env 파일 확인
cat backend/.env

# API 키가 있는지 확인
echo $OPENAI_API_KEY

# 없으면 다시 설정
export OPENAI_API_KEY=sk-proj-your-key-here
```

### Python 패키지 오류

```bash
cd backend
source venv/bin/activate

# 모든 패키지 재설치
pip install --force-reinstall -r requirements.txt

# 특정 패키지만
pip install --upgrade openai
```

### Node.js 패키지 오류

```bash
cd frontend

# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 클리어
npm cache clean --force
npm install
```

---

## 📊 모니터링

### Backend 로그 확인

```bash
# 실시간 로그
tail -f logs/app.log

# 에러만 필터링
tail -f logs/app.log | grep ERROR
```

### Database 크기 확인

```bash
psql -U ann -d ann -c "
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
"
```

### API 응답 시간 측정

```bash
# 시간 측정과 함께 요청
time curl -X POST http://localhost:8000/fact-check/ \
  -H "Content-Type: application/json" \
  -d '{"query": "Test"}'

# 여러 번 요청해서 평균 계산
for i in {1..10}; do
  time curl -s -X POST http://localhost:8000/fact-check/ \
    -H "Content-Type: application/json" \
    -d '{"query": "Test"}' > /dev/null
done
```

---

## 🔄 Git 워크플로우

### 초기 설정

```bash
git init
git add .
git commit -m "Initial commit: ANN MVP"

# GitHub에 푸시
git remote add origin https://github.com/yourusername/ann-project.git
git branch -M main
git push -u origin main
```

### 일상적인 커밋

```bash
git add .
git commit -m "feat: Add LLM integration"
git push
```

### 브랜치 작업

```bash
# 새 기능 브랜치
git checkout -b feature/expert-verification

# 작업 후
git add .
git commit -m "feat: Add expert verification system"
git checkout main
git merge feature/expert-verification
git push
```

---

## 📦 배포 준비

### Docker로 빌드

```bash
# Backend Dockerfile 생성
cat > backend/Dockerfile << 'EOF'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# Frontend Dockerfile 생성
cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
EOF

# Docker Compose
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://ann:password@db:5432/ann
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=ann
      - POSTGRES_USER=ann
      - POSTGRES_PASSWORD=password
EOF

# 실행
docker-compose up --build
```

---

## 🎯 체크리스트

### Phase 1 완료 확인
- [ ] Backend 서버 실행됨
- [ ] Frontend 서버 실행됨
- [ ] API 응답 받음
- [ ] UI에서 점수 표시됨

### Phase 2 완료 확인 (LLM)
- [ ] OpenAI API 키 설정됨
- [ ] LLM 서비스 작동함
- [ ] 다른 입력에 다른 점수 나옴
- [ ] AI 분석 이유 표시됨

### Phase 3 완료 확인 (DB)
- [ ] PostgreSQL 설치됨
- [ ] 테이블 생성됨
- [ ] 데이터 저장됨
- [ ] 히스토리 조회됨

### Phase 4 완료 확인 (댓글)
- [ ] 댓글 작성됨
- [ ] 댓글 표시됨
- [ ] 토론 점수 계산됨
- [ ] Credibility 점수 업데이트됨

---

이 파일을 열고 명령어를 복사해서 붙여넣기만 하면 됩니다!
