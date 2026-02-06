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
