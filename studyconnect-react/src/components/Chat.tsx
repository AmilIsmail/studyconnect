interface ChatProps {
  onBack: () => void;
}

function Chat({ onBack }: ChatProps) {
  return (
    <section>
      <article>
        <h1>Chat with Anna Müller</h1>

        <div className="chat-box">
          <div className="message received">
            <p><strong>Anna:</strong> Hi! Do you want to study Web Applications tomorrow?</p>
          </div>

          <div className="message sent">
            <p><strong>You:</strong> Yes, tomorrow at 4 PM works for me.</p>
          </div>

          <div className="message received">
            <p><strong>Anna:</strong> Perfect! Let’s meet in the library.</p>
          </div>
        </div>

        <input type="text" placeholder="Write a message..." />

        <div className="button-row">
          <button type="button">Send</button>
          <button type="button" className="secondary-btn" onClick={onBack}>
            Back to Dashboard
          </button>
        </div>
      </article>
    </section>
  );
}

export default Chat;