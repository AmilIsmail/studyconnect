interface RequestsProps {
  onBack: () => void;
  onChat: () => void;
}

function Requests({ onBack, onChat }: RequestsProps) {
  return (
    <section>
      <article>
        <h1>Study Requests</h1>

        <div className="group-card">
          <h3>Request from Anna Müller</h3>
          <p><strong>Module:</strong> Web Applications</p>
          <p><strong>Semester:</strong> 3</p>
          <p><strong>Message:</strong> Hi, would you like to study together?</p>

          <div className="button-row">
            <button type="button" onClick={onChat}>Accept and Chat</button>
            <button type="button" className="secondary-btn">Decline</button>
          </div>
        </div>

        <button type="button" className="secondary-btn" onClick={onBack}>
          Back to Dashboard
        </button>
      </article>
    </section>
  );
}

export default Requests;