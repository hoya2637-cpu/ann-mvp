export default function Page() {
  return (
    <>
      <header className="header">
        <div className="logo">ANN</div>
        <nav className="nav">
          <a href="#">Fact Check</a>
          <a href="#">News</a>
          <a href="#">Chat</a>
          <a href="#">API</a>
          <a href="#">About</a>
        </nav>
      </header>

      <section className="hero">
        <h1>AI News Network</h1>
        <p>Analyze news credibility through AI, research, and public discourse.</p>

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

      <footer className="footer">
        © 2026 AI News Network
      </footer>
    </>
  );
}
