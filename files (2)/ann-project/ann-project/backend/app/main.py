from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import fact_check, comments, admin_expert, admin_export

app = FastAPI(
    title="ANN Backend",
    description="AI News Network Fact Check API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # MVP 단계
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(fact_check.router)
app.include_router(comments.router)
app.include_router(admin_expert.router)
app.include_router(admin_export.router)

@app.get("/")
def root():
    return {
        "message": "ANN Backend is running",
        "status": "ok"
    }
