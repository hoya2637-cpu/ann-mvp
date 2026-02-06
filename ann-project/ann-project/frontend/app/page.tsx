export default function Page() {
  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">ANN</div>
        <nav className="nav">
          <a href="/">Fact Check</a>
          <a href="/news">News</a>
          <a href="/chat">Chat</a>
          <a href="/api">API</a>
          <a href="/about">About</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>AI News Network</h1>
        <p>
          Analyze news credibility through AI, research, and public discourse.
        </p>

        <div className="search-box">
          <input placeholder="Check a claim, headline, or URL..." />
          <button>Analyze</button>
        </div>

        <div className="helper-text">
          Enter a news claim, article headline, or URL for credibility analysis
        </div>

        <div className="quick-actions">
          <button>Fact-check a claim</button>
          <button>Verify a headline</button>
          <button>Check a news source</button>
        </div>
      </section>

      {/* RECENT */}
      <section className="recent">
        <h2>Recent Fact-Checked Topics</h2>
        <p>Recently analyzed claims and news stories</p>

        <div className="cards">
          <div className="card">
            <span className="tag">Economics</span>
            <h3>Federal Reserve signals potential rate adjustment in Q2 2026</h3>
            <div className="bar"><span style={{ width: "84%" }} /></div>
            <strong>84%</strong>
          </div>

          <div className="card">
            <span className="tag">Energy</span>
            <h3>Global renewable energy capacity exceeds projections</h3>
            <div className="bar"><span style={{ width: "87%" }} /></div>
            <strong>87%</strong>
          </div>

          <div className="card">
            <span className="tag">Health</span>
            <h3>Mediterranean diet study links nutrition to cognitive health</h3>
            <div className="bar"><span style={{ width: "76%" }} /></div>
            <strong>76%</strong>
          </div>
        </div>
      </section>

      {/* INFRA */}
      <section className="infra">
        <h2>Credibility Infrastructure</h2>
        <p>
          ANN provides transparent, multi-source fact-checking powered by AI
          analysis, expert review, and structured public discourse.
        </p>
        <em>
          A neutral meeting place between technology, journalism, and academia.
        </em>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h4>ANN Mission</h4>
            <p>
              We examine credibility — we do not declare truth.
            </p>
          </div>

          <div>
            <h4>Platform</h4>
            <ul>
              <li>Fact-Check Search</li>
              <li>Partner News</li>
              <li>AI News</li>
              <li>Become an Expert</li>
              <li>About ANN</li>
            </ul>
          </div>

          <div>
            <h4>Legal & Transparency</h4>
            <ul>
              <li>Methodology</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Academic Collaboration</li>
            </ul>
          </div>
        </div>

        <small>
          © 2026 AI News Network. A credibility infrastructure platform.
        </small>
      </footer>
    </>
  );
}
