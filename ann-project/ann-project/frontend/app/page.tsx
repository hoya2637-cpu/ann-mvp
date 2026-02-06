export default function HomePage() {
  return (
    <main style={{ padding: "80px 24px", maxWidth: "960px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "16px" }}>
        AI News Network
      </h1>

      <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "40px" }}>
        Analyze news credibility through AI, research, and public discourse.
      </p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "48px" }}>
        <input
          placeholder="Check a claim, headline, or URL..."
          style={{
            flex: 1,
            padding: "14px 16px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
          }}
        />
        <button
          style={{
            padding: "14px 24px",
            borderRadius: "8px",
            backgroundColor: "#A3FF12", // 연두 형광
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Analyze
        </button>
      </div>

      <section>
        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "12px" }}>
          What ANN Does
        </h2>
        <ul style={{ color: "#374151", lineHeight: "1.8" }}>
          <li>• AI-powered fact-checking engine</li>
          <li>• Expert & community-based credibility scoring</li>
          <li>• Live credibility index updated by discussion</li>
        </ul>
      </section>
    </main>
  );
}
