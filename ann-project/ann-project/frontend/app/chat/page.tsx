export default function ChatPage() {
  return (
    <section className="page">
      <h1>ANN Chat</h1>
      <p className="page-desc">
        Discuss fact-check results with ANN AI. Context is preloaded automatically.
      </p>

      <div className="chat-box">
        <div className="chat-message ai">
          <strong>ANN AI</strong>
          <p>
            This claim has a credibility score of 82%. Key uncertainty comes from
            limited primary sources.
          </p>
        </div>

        <div className="chat-message user">
          <strong>You</strong>
          <p>Why do experts disagree on this?</p>
        </div>

        <div className="chat-message ai">
          <strong>ANN AI</strong>
          <p>
            Experts weigh evidence differently based on methodology and source
            reliability.
          </p>
        </div>
      </div>

      <div className="chat-input">
        <input placeholder="Ask a question about this fact check..." />
        <button>Send</button>
      </div>
    </section>
  );
}


const mockContext = {
  title: "Federal Reserve signals potential rate adjustment",
  score: 84,
  uncertainty: "Timing and source divergence"
};

export default function ChatPage() {
  return (
    <section className="page">
      <h1>ANN AI Discussion</h1>

      {/* Context */}
      <div className="chat-context">
        <strong>Fact Check Context</strong>
        <p>{mockContext.title}</p>
        <p>Credibility Score: {mockContext.score}%</p>
        <p>Key Uncertainty: {mockContext.uncertainty}</p>
      </div>

      {/* Chat */}
      <div className="chat-box">
        <div className="chat-message ai">
          <strong>ANN AI</strong>
          <p>
            This score reflects mixed expert assessments and limited primary confirmation.
          </p>
        </div>

        <div className="chat-message user">
          <strong>You</strong>
          <p>What evidence would increase the score?</p>
        </div>

        <div className="chat-message ai">
          <strong>ANN AI</strong>
          <p>
            Official Fed statements or corroborated economic indicators.
          </p>
        </div>
      </div>

      <div className="chat-input">
        <input placeholder="Ask about this credibility result..." />
        <button>Send</button>
      </div>
    </section>
  );
}
