from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from io import StringIO

router = APIRouter(prefix="/admin/export", tags=["Admin"])

# MVP: 메모리 로그
LOGS = []

@router.get("/")
def export_logs():
    """
    연구 데이터 Export (CSV)
    
    Columbia · KAIST 연구 연결용
    """
    def generate():
        output = StringIO()
        output.write("query,verdict,score\n")
        for log in LOGS:
            query = log.get("query", "")
            verdict = log.get("verdict", "")
            score = log.get("score", 0)
            output.write(f'"{query}","{verdict}",{score}\n')
        return output.getvalue()

    csv_data = generate()
    
    return StreamingResponse(
        iter([csv_data]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=ann_research_data.csv"}
    )

@router.post("/log")
def add_log(query: str, verdict: str, score: int):
    """로그 추가"""
    LOGS.append({
        "query": query,
        "verdict": verdict,
        "score": score
    })
    return {"status": "logged"}
