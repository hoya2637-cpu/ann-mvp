"use client";
import { useState } from "react";
import { checkFact } from "@/lib/api";
import CredibilityScore from "./CredibilityScore";

interface FactCheckResult {
  credibility_score: number;
  components: {
    ai_score: number;
    expert_score: number;
    discussion_score: number;
    stability_score: number;
  };
}

export default function FactCheckSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<FactCheckResult | null>(null);
  
  // ← 여기서 이름 변경 (status → verificationStatus)
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "loading" | "done"
  >("idle");

  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!query.trim()) {
      setError("Please enter a claim or news URL");
      return;
    }

    setVerificationStatus("loading");  // ← 변경
    setError(null);

    try {
      const res = await checkFact(query);
      setResult(res);
      setVerificationStatus("done");     // ← 변경
    } catch (err) {
      setError("Failed to analyze. Please check your connection and try again.");
      console.error(err);
      setVerificationStatus("idle");     // ← 변경 (에러 시 idle로 복구)
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && verificationStatus !== "loading") {  // ← 변경
      handleCheck();
    }
  };

  const exampleQueries = [
    "COVID-19 vaccines are safe and effective",
    "Climate change is caused by human activities",
    "The Earth is flat",
  ];

  return (
    <section id="fact-check" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Check Any Claim
          </h2>
          <p className="text-gray-400 text-lg">
            Paste a news URL or type a claim to verify
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="relative">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-[#0B1220] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all"
                  placeholder="Enter claim or paste news URL..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={verificationStatus === "loading"}  // ← 변경
                />
              </div>

              <button
                onClick={handleCheck}
                disabled={verificationStatus === "loading" || !query.trim()}  // ← 변경
                className="bg-lime-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-lime-500 transition-all duration-200 hover:shadow-lg hover:shadow-lime-400/50 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verificationStatus === "loading" ? (  // ← 변경
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze"
                )}
              </button>
            </div>

            {/* Example Queries */}
            {!result && verificationStatus !== "loading" && (  // ← 변경
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3">Try examples:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQueries.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(example)}
                      className="text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-lime-400 border border-white/5 hover:border-lime-400/30 transition-all"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {verificationStatus === "loading" && (  // ← 변경
            <div className="mt-8 text-center">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-700 border-t-lime-400 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-lime-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 font-medium">Analyzing claim...</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                    <span>Checking with AI models</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div
                      className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span>Consulting expert opinions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div
                      className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <span>Analyzing community discussion</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {result && verificationStatus !== "loading" && (  // ← 변경
          <div className="space-y-6">
            <CredibilityScore score={result.credibility_score} />

            {/* Component Breakdown */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-lime-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Score Breakdown
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ScoreComponent
                  label="AI Analysis"
                  score={result.components.ai_score}
                  weight={35}
                  icon="🤖"
                />
                <ScoreComponent
                  label="Expert Opinion"
                  score={result.components.expert_score}
                  weight={35}
                  icon="🧠"
                />
                <ScoreComponent
                  label="Discussion"
                  score={result.components.discussion_score}
                  weight={20}
                  icon="💬"
                />
                <ScoreComponent
                  label="Stability"
                  score={result.components.stability_score}
                  weight={10}
                  icon="⏱️"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setResult(null);
                  setQuery("");
                  setVerificationStatus("idle");  // ← 변경
                }}
                className="border-2 border-lime-400 text-lime-400 font-semibold px-6 py-3 rounded-lg hover:bg-lime-400 hover:text-black transition-all duration-200 flex-1"
              >
                Check Another Claim
              </button>
              <button className="bg-lime-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-lime-500 transition-all duration-200 hover:shadow-lg hover:shadow-lime-400/50 flex-1 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share Results
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ScoreComponent({
  label,
  score,
  weight,
  icon,
}: {
  label: string;
  score: number;
  weight: number;
  icon: string;
}) {
  return (
    <div className="bg-[#0B1220] rounded-lg p-4 border border-gray-800 hover:border-lime-400/30 transition-all">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-lime-400 mb-1">{score}</div>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-xs text-gray-600">Weight: {weight}%</div>
    </div>
  );
}
