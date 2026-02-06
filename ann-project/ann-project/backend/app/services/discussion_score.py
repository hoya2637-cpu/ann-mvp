def calculate_discussion_score(comments: list) -> float:
    """
    커뮤니티 토론 점수 계산
    
    - 댓글 없으면: 중립 50점
    - 일반 댓글: +1점
    - 전문가 댓글: +3점
    """
    if not comments:
        return 50.0  # 중립

    score = 50
    for c in comments:
        if isinstance(c, dict):
            if c.get("is_expert"):
                score += 3
            else:
                score += 1
        else:
            if c.is_expert:
                score += 3
            else:
                score += 1

    return min(score, 100)
