"use client";

import { useState } from "react";
import { checkFact } from "@/lib/api";
import CredibilityScore from "./CredibilityScore";

export default function FactCheckSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<number | null>(null);
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
      setResult(res.credibility_score);
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
      {loading && <p className="mt-4 text-gray-400">Analyzing claim...</p>}
      {result !== null && <CredibilityScore score={result} />}
    </div>
  );
}
