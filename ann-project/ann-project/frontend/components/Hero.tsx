export default function Hero() {
  return (
    <section className="hero">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="grid-bg" />

      <h1>AI News Network</h1>
      <p>Credibility Infrastructure for the AI Era</p>

      <div className="cta">
        <button className="primary">Start Fact Checking</button>
        <button className="secondary">View API Docs</button>
      </div>

      <div className="stats">
        <Stat label="AI" value={35} />
        <Stat label="Experts" value={35} />
        <Stat label="Community" value={30} />
      </div>

      <div className="scroll-indicator">↓</div>
    </section>
  );
}
