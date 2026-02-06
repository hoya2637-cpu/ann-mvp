export default function Home() {
  return (
    <main style={{ padding: "80px", fontFamily: "Arial" }}>
      <h1>AI News Network</h1>
      <p>Analyze news credibility through AI and public discourse.</p>

      <input
        placeholder="Enter a news headline or claim..."
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          fontSize: "16px",
        }}
      />

      <button
        style={{
          marginTop: "16px",
          padding: "12px 24px",
          background: "#9eff00",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Analyze
      </button>
    </main>
  );
}
