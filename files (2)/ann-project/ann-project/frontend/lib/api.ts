const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function checkFact(query: string) {
  const res = await fetch(`${API_BASE_URL}/fact-check/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error("Failed to check fact");
  }

  return res.json();
}

export async function getComments(newsId: number) {
  const res = await fetch(`${API_BASE_URL}/comments/${newsId}`);
  
  if (!res.ok) {
    throw new Error("Failed to get comments");
  }
  
  return res.json();
}

export async function addComment(newsId: number, user: string, content: string, isExpert: boolean = false) {
  const res = await fetch(`${API_BASE_URL}/comments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ news_id: newsId, user, content, is_expert: isExpert }),
  });

  if (!res.ok) {
    throw new Error("Failed to add comment");
  }

  return res.json();
}
