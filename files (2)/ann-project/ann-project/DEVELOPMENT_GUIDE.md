# ANN 프로젝트 실전 개발 가이드

## 🎯 목표: MVP를 실제 서비스로 만들기

현재 코드는 "작동하는 껍데기"입니다. 이제 진짜 두뇌를 넣어야 합니다.

---

## 📋 개발 우선순위 (반드시 이 순서로!)

### Phase 1: LLM 연동 (1-2주) ⭐⭐⭐⭐⭐
가장 중요! 이것 없으면 의미 없음

### Phase 2: Database 실제 사용 (3-4일) ⭐⭐⭐⭐
데이터 쌓여야 학습 가능

### Phase 3: 댓글 시스템 실제 연동 (1주) ⭐⭐⭐
커뮤니티 기능 활성화

### Phase 4: 전문가 인증 (1주) ⭐⭐
신뢰성 확보

---

## 🚀 Phase 1: LLM 연동 (실제 Fact Check)

### 1-1. OpenAI API 설정

#### 백엔드에 라이브러리 추가
```bash
cd backend
pip install openai python-dotenv
```

#### requirements.txt 업데이트
```txt
# backend/requirements.txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
openai==1.3.0           # 추가!
python-dotenv==1.0.0    # 추가!
```

#### .env 파일 생성
```bash
# backend/.env
OPENAI_API_KEY=sk-proj-your-api-key-here
DATABASE_URL=postgresql://ann:password@localhost:5432/ann
```

### 1-2. LLM 서비스 만들기

#### 새 파일: backend/app/services/llm_service.py
```python
import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def analyze_claim_with_ai(claim: str) -> dict:
    """
    실제 AI로 Fact Check 수행
    
    Returns:
        {
            "score": 0-100,
            "reasoning": "분석 근거",
            "sources": ["출처1", "출처2"]
        }
    """
    
    system_prompt = """당신은 팩트체크 전문가입니다.
    주장을 분석하고 0-100점 사이의 신뢰도 점수를 매기세요.
    
    점수 기준:
    - 90-100: 명백한 사실
    - 70-89: 대체로 사실
    - 50-69: 부분적으로 사실
    - 30-49: 대체로 거짓
    - 0-29: 명백한 거짓
    
    JSON 형식으로만 응답하세요:
    {
        "score": 85,
        "reasoning": "분석 근거",
        "category": "politics/health/finance/etc"
    }
    """
    
    user_prompt = f"다음 주장을 팩트체크하세요: {claim}"
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",  # 빠르고 저렴
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,  # 일관성 있는 답변
            response_format={"type": "json_object"}
        )
        
        import json
        result = json.loads(response.choices[0].message.content)
        
        return {
            "score": result.get("score", 50),
            "reasoning": result.get("reasoning", "분석 중..."),
            "category": result.get("category", "general")
        }
        
    except Exception as e:
        print(f"LLM Error: {e}")
        # Fallback: 중립 점수
        return {
            "score": 50,
            "reasoning": "AI 분석 실패",
            "category": "error"
        }


async def get_expert_opinion(claim: str, category: str) -> int:
    """
    전문가 의견 시뮬레이션
    (나중에 실제 전문가 DB로 교체)
    """
    
    # 카테고리별 전문가 신뢰도 가중치
    expert_weights = {
        "politics": 0.8,
        "health": 0.9,
        "finance": 0.85,
        "science": 0.95,
        "general": 0.7
    }
    
    weight = expert_weights.get(category, 0.7)
    
    # AI 점수를 베이스로 전문가 점수 생성
    prompt = f"""전문가 관점에서 이 주장을 평가하세요: {claim}
    카테고리: {category}
    
    전문가로서 0-100 점수만 응답하세요."""
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=10
        )
        
        score_text = response.choices[0].message.content.strip()
        score = int(''.join(filter(str.isdigit, score_text)))
        
        return min(max(score, 0), 100)
        
    except:
        return 60  # Fallback
```

### 1-3. Fact Check API 업데이트

#### 수정: backend/app/routes/fact_check.py
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.credibility_engine import calculate_credibility
from app.services.llm_service import analyze_claim_with_ai, get_expert_opinion

router = APIRouter(prefix="/fact-check", tags=["Fact Check"])

class FactCheckRequest(BaseModel):
    query: str

@router.post("/")
async def fact_check(request: FactCheckRequest):
    """
    실제 AI 기반 Fact Check
    """
    
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    # 1. AI 분석 (실제!)
    ai_result = await analyze_claim_with_ai(request.query)
    base_ai_score = ai_result["score"]
    
    # 2. 전문가 의견 (AI 시뮬레이션)
    expert_score = await get_expert_opinion(
        request.query, 
        ai_result["category"]
    )
    
    # 3. 토론 점수 (현재는 기본값, 나중에 실제 댓글 반영)
    discussion_score = 50
    
    # 4. 안정성 점수 (시간에 따라 변화 - 일단 고정)
    stability_score = 75
    
    # 5. 최종 신뢰도 계산
    final_score = calculate_credibility(
        base_ai_score,
        expert_score,
        discussion_score,
        stability_score
    )
    
    return {
        "query": request.query,
        "credibility_score": final_score,
        "status": "analyzed",
        "components": {
            "ai_score": base_ai_score,
            "ai_reasoning": ai_result["reasoning"],
            "expert_score": expert_score,
            "discussion_score": discussion_score,
            "stability_score": stability_score,
            "category": ai_result["category"]
        }
    }


@router.get("/test")
async def test_llm():
    """LLM 연동 테스트"""
    test_claim = "The Earth is round"
    result = await analyze_claim_with_ai(test_claim)
    return {"test_claim": test_claim, "result": result}
```

### 1-4. 테스트

```bash
# 1. 서버 재시작
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# 2. 테스트 요청
curl -X POST http://localhost:8000/fact-check/ \
  -H "Content-Type: application/json" \
  -d '{"query": "COVID-19 vaccines are safe and effective"}'

# 예상 결과:
{
  "credibility_score": 87.5,  # 이제 다른 점수가 나옴!
  "components": {
    "ai_score": 92,
    "ai_reasoning": "Multiple peer-reviewed studies...",
    "expert_score": 88
  }
}
```

---

## 🗄️ Phase 2: Database 실제 사용

### 2-1. PostgreSQL 설치 및 설정

```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# Ubuntu
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# 데이터베이스 생성
psql postgres
CREATE DATABASE ann;
CREATE USER ann WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE ann TO ann;
\q
```

### 2-2. Database 초기화 스크립트

#### 새 파일: backend/init_db.py
```python
from app.database import engine, Base
from app.models.news import News
from app.models.credibility import CredibilityIndex
from app.models.comment import Comment
from app.models.user import User
from app.models.log import FactCheckLog

def init_database():
    """데이터베이스 테이블 생성"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Database initialized successfully!")

if __name__ == "__main__":
    init_database()
```

```bash
# 실행
python init_db.py
```

### 2-3. 실제 DB 사용하도록 API 수정

#### 수정: backend/app/routes/fact_check.py
```python
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.news import News
from app.models.credibility import CredibilityIndex
from app.models.log import FactCheckLog
from datetime import datetime

# DB 세션 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
async def fact_check(request: FactCheckRequest, db: Session = Depends(get_db)):
    """
    DB에 저장하는 Fact Check
    """
    
    # AI 분석
    ai_result = await analyze_claim_with_ai(request.query)
    base_ai_score = ai_result["score"]
    expert_score = await get_expert_opinion(request.query, ai_result["category"])
    
    # 최종 점수 계산
    final_score = calculate_credibility(
        base_ai_score, expert_score, 50, 75
    )
    
    # 1. News 테이블에 저장
    news = News(
        title=request.query[:100],  # 처음 100자
        source="user_submission",
        content=request.query,
        base_ai_score=base_ai_score
    )
    db.add(news)
    db.commit()
    db.refresh(news)
    
    # 2. Credibility Index 저장
    credibility = CredibilityIndex(
        news_id=news.id,
        final_score=final_score
    )
    db.add(credibility)
    
    # 3. Fact Check 로그 저장
    log = FactCheckLog(
        query=request.query,
        verdict=ai_result["reasoning"],
        score=int(final_score)
    )
    db.add(log)
    
    db.commit()
    
    return {
        "query": request.query,
        "news_id": news.id,
        "credibility_score": final_score,
        "components": {
            "ai_score": base_ai_score,
            "ai_reasoning": ai_result["reasoning"],
            "expert_score": expert_score
        }
    }


@router.get("/history")
def get_history(limit: int = 10, db: Session = Depends(get_db)):
    """최근 Fact Check 기록"""
    logs = db.query(FactCheckLog).order_by(
        FactCheckLog.created_at.desc()
    ).limit(limit).all()
    
    return {
        "total": len(logs),
        "history": [
            {
                "query": log.query,
                "score": log.score,
                "verdict": log.verdict,
                "timestamp": log.created_at
            }
            for log in logs
        ]
    }
```

---

## 💬 Phase 3: 댓글 시스템 실제 연동

### 3-1. 댓글 API 완전 구현

#### 수정: backend/app/routes/comments.py
```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import SessionLocal
from app.models.comment import Comment as CommentModel
from app.services.discussion_score import calculate_discussion_score

router = APIRouter(prefix="/comments", tags=["Comments"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class CommentRequest(BaseModel):
    news_id: int
    user: str
    content: str
    is_expert: bool = False

@router.post("/")
def add_comment(request: CommentRequest, db: Session = Depends(get_db)):
    """실제 DB에 댓글 저장"""
    
    comment = CommentModel(
        news_id=request.news_id,
        user_name=request.user,
        content=request.content,
        is_expert=request.is_expert
    )
    
    db.add(comment)
    db.commit()
    db.refresh(comment)
    
    # 토론 점수 재계산
    all_comments = db.query(CommentModel).filter(
        CommentModel.news_id == request.news_id
    ).all()
    
    new_discussion_score = calculate_discussion_score(all_comments)
    
    # Credibility Index 업데이트
    from app.models.credibility import CredibilityIndex
    credibility = db.query(CredibilityIndex).filter(
        CredibilityIndex.news_id == request.news_id
    ).first()
    
    if credibility:
        # 토론 점수만 업데이트해서 재계산
        from app.services.credibility_engine import calculate_credibility
        from app.models.news import News
        
        news = db.query(News).filter(News.id == request.news_id).first()
        
        new_score = calculate_credibility(
            news.base_ai_score,
            60,  # expert_score (나중에 실제 계산)
            new_discussion_score,
            75   # stability_score
        )
        
        credibility.final_score = new_score
        credibility.updated_at = datetime.utcnow()
        db.commit()
    
    return {
        "status": "ok",
        "comment_id": comment.id,
        "new_discussion_score": new_discussion_score
    }

@router.get("/{news_id}")
def get_comments(news_id: int, db: Session = Depends(get_db)):
    """실제 DB에서 댓글 조회"""
    
    comments = db.query(CommentModel).filter(
        CommentModel.news_id == news_id
    ).order_by(CommentModel.created_at.desc()).all()
    
    score = calculate_discussion_score(comments)
    
    return {
        "comments": [
            {
                "id": c.id,
                "user": c.user_name,
                "content": c.content,
                "is_expert": c.is_expert,
                "created_at": c.created_at
            }
            for c in comments
        ],
        "discussion_score": score,
        "total_comments": len(comments)
    }
```

### 3-2. Frontend 댓글 실제 연동

#### 수정: frontend/components/CommentSection.tsx
```typescript
"use client";

import { useState, useEffect } from "react";
import { getComments, addComment } from "@/lib/api";

interface Comment {
  id: number;
  user: string;
  content: string;
  is_expert: boolean;
  created_at: string;
}

export default function CommentSection({ newsId }: { newsId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [discussionScore, setDiscussionScore] = useState(50);

  // 댓글 불러오기
  useEffect(() => {
    loadComments();
  }, [newsId]);

  const loadComments = async () => {
    try {
      const data = await getComments(newsId);
      setComments(data.comments);
      setDiscussionScore(data.discussion_score);
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  };

  const submitComment = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      await addComment(newsId, "Anonymous User", content, false);
      setContent("");
      await loadComments(); // 새로고침
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 text-left max-w-3xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">
          Community Discussion
        </h3>
        <div className="text-sm">
          <span className="text-gray-400">Discussion Score: </span>
          <span className="text-lime-400 font-bold">{discussionScore}</span>
        </div>
      </div>

      {comments.length === 0 && (
        <p className="text-gray-500 mb-4">
          No comments yet. Be the first to discuss!
        </p>
      )}

      {comments.map((c) => (
        <div
          key={c.id}
          className="mb-3 p-4 bg-[#111827] rounded border border-gray-700"
        >
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-gray-400">
              {c.is_expert ? "🧠 Expert" : "👤 " + c.user}
            </p>
            {c.is_expert && (
              <span className="px-2 py-1 text-xs bg-lime-400 text-black rounded font-semibold">
                Verified Expert
              </span>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {new Date(c.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-white">{c.content}</p>
        </div>
      ))}

      <textarea
        className="w-full mt-4 p-3 bg-[#0B1220] border border-gray-700 text-white rounded focus:outline-none focus:border-lime-400 placeholder-gray-500"
        placeholder="Share your reasoning..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />

      <button
        onClick={submitComment}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-lime-400 text-black rounded font-semibold hover:bg-lime-500 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Comment"}
      </button>
    </div>
  );
}
```

---

## 👤 Phase 4: 전문가 인증 시스템

### 4-1. 전문가 신청 API

#### 새 파일: backend/app/routes/expert_application.py
```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import SessionLocal
from app.models.user import User

router = APIRouter(prefix="/expert", tags=["Expert"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ExpertApplicationRequest(BaseModel):
    name: str
    email: str
    expertise: str  # "journalism", "science", "politics", etc.
    credentials: str  # 경력 설명
    linkedin_url: str = ""

@router.post("/apply")
def apply_as_expert(request: ExpertApplicationRequest, db: Session = Depends(get_db)):
    """전문가 신청"""
    
    # 이미 존재하는지 확인
    existing = db.query(User).filter(User.name == request.email).first()
    if existing:
        return {"error": "Already applied"}
    
    user = User(
        name=request.name,
        role="expert_pending",  # 승인 대기
        is_verified=False
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return {
        "status": "pending",
        "message": "Application submitted. Wait for admin approval.",
        "user_id": user.id
    }

@router.get("/pending")
def get_pending_experts(db: Session = Depends(get_db)):
    """승인 대기 중인 전문가 목록 (Admin용)"""
    
    pending = db.query(User).filter(
        User.role == "expert_pending"
    ).all()
    
    return {
        "total": len(pending),
        "experts": [
            {
                "id": u.id,
                "name": u.name,
                "role": u.role
            }
            for u in pending
        ]
    }
```

#### main.py에 라우터 추가
```python
from app.routes import fact_check, comments, admin_expert, admin_export, expert_application

app.include_router(expert_application.router)
```

---

## 🎨 Frontend 개선사항

### 5-1. 실시간 점수 업데이트

#### 수정: frontend/components/FactCheckSearch.tsx
```typescript
"use client";

import { useState } from "react";
import { checkFact } from "@/lib/api";
import CredibilityScore from "./CredibilityScore";
import CommentSection from "./CommentSection";

interface FactCheckResult {
  credibility_score: number;
  news_id: number;
  components: {
    ai_score: number;
    ai_reasoning: string;
    expert_score: number;
    category: string;
  };
}

export default function FactCheckSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!query.trim()) {
      setError("Please enter a query");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const res = await checkFact(query);
      setResult(res);
    } catch (err) {
      setError("Failed to analyze. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-32 max-w-3xl mx-auto text-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Verify the Truth
      </h1>
      <p className="text-gray-400 mb-8">
        AI-powered fact checking with community verification
      </p>

      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-3 rounded bg-[#111827] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400"
          placeholder="Paste news URL or claim..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="px-6 py-3 bg-lime-400 text-black font-semibold rounded hover:bg-lime-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-400">{error}</p>}
      
      {loading && (
        <div className="mt-8">
          <p className="text-gray-400">Analyzing claim...</p>
          <div className="mt-2 text-sm text-gray-500">
            • Checking facts with AI<br/>
            • Consulting expert opinions<br/>
            • Analyzing community discussion
          </div>
        </div>
      )}
      
      {result && (
        <>
          <CredibilityScore score={result.credibility_score} />
          
          <div className="mt-6 p-4 bg-[#111827] rounded text-left">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              Analysis Details
            </h3>
            <p className="text-white text-sm mb-2">
              {result.components.ai_reasoning}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Category: </span>
                <span className="text-lime-400">{result.components.category}</span>
              </div>
              <div>
                <span className="text-gray-400">AI Score: </span>
                <span className="text-white">{result.components.ai_score}</span>
              </div>
            </div>
          </div>

          {/* 댓글 섹션 추가 */}
          <CommentSection newsId={result.news_id} />
        </>
      )}
    </div>
  );
}
```

---

## 📝 개발 체크리스트

### Week 1
- [ ] OpenAI API 키 발급
- [ ] LLM 서비스 구현
- [ ] Fact Check API 업데이트
- [ ] 테스트: 다른 점수가 나오는지 확인

### Week 2
- [ ] PostgreSQL 설치 및 설정
- [ ] Database 초기화
- [ ] API에 DB 연동
- [ ] 테스트: 데이터가 저장되는지 확인

### Week 3
- [ ] 댓글 API 완전 구현
- [ ] Frontend 댓글 실제 연동
- [ ] 토론 점수가 실시간 반영되는지 확인

### Week 4
- [ ] 전문가 신청 시스템
- [ ] Admin 승인 기능
- [ ] Frontend 개선
- [ ] 전체 통합 테스트

---

## 🚨 주의사항

### 1. API 키 보안
```bash
# .env 파일은 절대 Git에 올리지 말 것!
echo ".env" >> .gitignore
```

### 2. 비용 관리
```python
# OpenAI API 비용 절약 팁
- gpt-4o-mini 사용 (gpt-4보다 15배 저렴)
- max_tokens 제한 설정
- 캐싱 활용 (같은 질문은 DB에서 조회)
```

### 3. 에러 처리
모든 API 호출에 try-except 필수!

### 4. 테스트
각 기능 구현 후 반드시 테스트!

---

## 🎯 완성 후 모습

```bash
# 사용자 입력
"COVID-19 vaccines cause autism"

# AI 분석 결과
{
  "credibility_score": 12,  # 낮음!
  "ai_score": 8,
  "ai_reasoning": "This claim has been thoroughly debunked by multiple peer-reviewed studies...",
  "category": "health"
}

# 다른 입력
"The Earth orbits the Sun"

# AI 분석 결과
{
  "credibility_score": 98,  # 높음!
  "ai_score": 100,
  "ai_reasoning": "Well-established scientific fact supported by centuries of observation...",
  "category": "science"
}
```

**이제 진짜 작동하는 서비스입니다!**
