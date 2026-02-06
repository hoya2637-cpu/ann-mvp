# ANN 빠른 시작 가이드

## 1분 안에 실행하기 🚀

### Step 1: Backend 실행

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

✅ Backend 실행 확인: http://localhost:8000

### Step 2: Frontend 실행 (새 터미널)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend 실행 확인: http://localhost:3000

## 주요 화면

### 1. 홈페이지 (Fact Check)
- http://localhost:3000
- 뉴스 URL 또는 주장 입력
- "Analyze" 버튼 클릭
- Credibility Score 확인

### 2. Admin Dashboard
- http://localhost:3000/admin
- 전문가 승인 관리
- 가중치 설정 확인
- 데이터 Export

### 3. API 문서
- http://localhost:8000/docs
- Swagger UI로 API 테스트 가능

## 테스트 방법

### API 직접 테스트

```bash
# Fact Check 테스트
curl -X POST http://localhost:8000/fact-check/ \
  -H "Content-Type: application/json" \
  -d '{"query": "Test news claim"}'

# 댓글 추가 테스트
curl -X POST http://localhost:8000/comments/ \
  -H "Content-Type: application/json" \
  -d '{"news_id": 1, "user": "TestUser", "content": "This is a test", "is_expert": false}'
```

## 문제 해결

### Backend가 실행되지 않는 경우
- Python 버전 확인: `python3 --version` (3.9+ 필요)
- 포트 충돌 확인: 8000 포트가 사용 중인지 확인

### Frontend가 실행되지 않는 경우
- Node.js 버전 확인: `node --version` (18+ 필요)
- 포트 충돌 확인: 3000 포트가 사용 중인지 확인
- node_modules 삭제 후 재설치

### Database 연결 오류
- 현재는 PostgreSQL이 없어도 작동합니다 (메모리 DB 사용)
- 실제 DB 연결이 필요하면 PostgreSQL 설치 및 설정 필요

## 다음 단계

1. ✅ 기본 실행 완료
2. 📝 코드 구조 파악
3. 🔧 기능 추가/수정
4. 🚀 배포 준비

## 개발 팁

### Hot Reload
- Backend: FastAPI는 `--reload` 옵션으로 자동 재시작
- Frontend: Next.js는 자동으로 변경사항 반영

### 디버깅
- Backend 로그: 터미널에서 확인
- Frontend 로그: 브라우저 개발자 도구 콘솔

### API 테스트
- Swagger UI: http://localhost:8000/docs
- 직접 curl 명령어 사용

## 지원

문제가 있으면 GitHub Issues에 등록해주세요!
