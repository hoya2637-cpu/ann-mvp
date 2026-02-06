export default function Home() {
  return (
    <section className="hero">
      <h1>Trust, Verified by ANN</h1>
      <p>
        Analyze news credibility through AI, research, and public discourse.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Check a claim, headline, or URL..."
        />
        <button>Analyze</button>
      </div>

      <div className="quick-actions">
        <button>Fact-check a claim</button>
        <button>Verify a headline</button>
        <button>Check a news source</button>
      </div>
    </section>
  );
}
