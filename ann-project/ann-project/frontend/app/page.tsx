export default function Page() {
  return (
    <>
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
          <button>Check a news source</button>
        </div>
      </section>

      <section className="recent">
        <h2>Recent Fact-Checked Topics</h2>
        {/* 카드 컴포넌트는 나중에 추가 */}
      </section>

      <section className="credibility">
        <h2>Credibility Infrastructure</h2>
        <p>
          ANN provides transparent, multi-source fact-checking powered by AI
          analysis, expert review, and structured public discourse.
        </p>
        <p className="sub">
          A neutral meeting place between technology, journalism, and academia.
        </p>
      </section>
    </>
  );
}
