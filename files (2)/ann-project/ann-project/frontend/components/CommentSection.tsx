"use client";

import { useState } from "react";

interface Comment {
  user: string;
  content: string;
  isExpert: boolean;
}

export default function CommentSection({ newsId }: { newsId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  const submitComment = () => {
    if (!content.trim()) return;

    setComments([
      ...comments,
      { user: "User", content, isExpert: false }
    ]);
    setContent("");
  };

  return (
    <div className="mt-10 text-left max-w-3xl mx-auto px-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        Community Discussion
      </h3>

      {comments.length === 0 && (
        <p className="text-gray-500 mb-4">No comments yet. Be the first to discuss!</p>
      )}

      {comments.map((c, i) => (
        <div key={i} className="mb-3 p-4 bg-[#111827] rounded border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-gray-400">
              {c.isExpert ? "🧠 Expert" : "👤 User"}
            </p>
            {c.isExpert && (
              <span className="px-2 py-1 text-xs bg-lime-400 text-black rounded font-semibold">
                Verified Expert
              </span>
            )}
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
        className="mt-2 px-4 py-2 bg-lime-400 text-black rounded font-semibold hover:bg-lime-500"
      >
        Comment
      </button>
    </div>
  );
}
