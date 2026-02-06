export default function Page() {
  return (
    <section className="hero">
      <h1>AI News Network</h1>
      <p>
        Analyze news credibility through AI, research, and public discourse.
      </p>

      <div className="search-box">
        <input placeholder="Check a claim, headline, or URL..." />
        <button>Analyze</button>
      </div>

      <div className="quick-actions">
        <button>Fact-check a claim</button>
        <button>Verify a headline</button>
        <button>Check a source</button>
      </div>
    </section>
  );
}
