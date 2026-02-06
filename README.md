# ANN (AI News Network)

AI 기반 팩트체크 플랫폼 - 진실을 검증하는 새로운 방법

## 🎯 프로젝트 개요

ANN은 AI 분석, 전문가 의견, 커뮤니티 토론을 결합한 혁신적인 신뢰도 평가 시스템입니다.

### 신뢰도 계산 공식

```
Final Credibility Score = 
  AI 분석 (35%) + 
  Expert 의견 (35%) + 
  커뮤니티 토론 (20%) + 
  시간 안정성 (10%)
```

## 📁 프로젝트 구조

```
ann-project/
├── backend/          # FastAPI 백엔드
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/      # SQLAlchemy 모델
│   │   ├── routes/      # API 라우터
│   │   └── services/    # 비즈니스 로직
│   ├── requirements.txt
│   └── start.sh
│
└── frontend/         # Next.js 프론트엔드
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── admin/
    ├── components/
    ├── lib/
    ├── package.json
    └── start.sh
```

## 🚀 시작하기

### 필수 요구사항

- Python 3.9+
- Node.js 18+
- PostgreSQL (선택사항)

### Backend 실행

```bash
cd backend
./start.sh
```

또는 수동 실행:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

서버 실행 후: http://localhost:8000

### Frontend 실행

```bash
cd frontend
./start.sh
```

또는 수동 실행:

```bash
cd frontend
npm install
npm run dev
```

서버 실행 후: http://localhost:3000

## 🔧 주요 기능

### 1. Fact Check Engine
- AI 기반 신뢰도 분석
- 실시간 검증 결과 제공

### 2. Community Discussion
- 댓글 시스템
- 전문가 vs 일반 사용자 구분
- 토론 점수 반영

### 3. Expert Verification
- 전문가 인증 시스템
- 가중치 기반 의견 반영

### 4. Admin Dashboard
- 전문가 승인 관리
- 가중치 설정 조정
- 연구 데이터 Export

## 📡 API 엔드포인트

### Fact Check
```
POST /fact-check/
Body: { "query": "검증할 내용" }
Response: { "credibility_score": 67.45, ... }
```

### Comments
```
POST /comments/
GET /comments/{news_id}
```

### Admin
```
POST /admin/experts/approve
POST /admin/experts/weights
GET /admin/export/
```

## 🛠 기술 스택

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS

## 📝 개발 로드맵

- [x] 1단계: Fact Check UI
- [x] 2단계: 댓글·토론·Expert 가중치
- [ ] 3단계: LLM 연동 (실제 Fact Check)
- [ ] 4단계: Admin Dashboard 고도화

## 🤝 기여하기

이 프로젝트는 MVP 단계입니다. 기여를 환영합니다!

## 📄 라이선스

MIT License

## 👥 팀

ANN Development Team
