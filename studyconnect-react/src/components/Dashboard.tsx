interface DashboardProps {
  onSearch: () => void;
  onRequests: () => void;
  onChat: () => void;
  onLogout: () => void;
}

function Dashboard({ onSearch, onRequests, onChat, onLogout }: DashboardProps) {
  return (
    <>
      <section className="hero">
        <article>
          <h1>Welcome to your dashboard</h1>
          <p>
            From here you can browse modules, search for study partners,
            manage requests and use the chat prototype.
          </p>
        </article>
      </section>

      <section>
        <h2>Your options</h2>

        <div className="grid-container">
          <article className="group-card">
            <h3>Find Partners</h3>
            <p>Search by module, semester and learning format.</p>
            <button type="button" onClick={onSearch}>Search Partners</button>
          </article>

          <article className="group-card">
            <h3>Requests</h3>
            <p>Review study requests and accept or decline them.</p>
            <button type="button" onClick={onRequests}>View Requests</button>
          </article>

          <article className="group-card">
            <h3>Chat</h3>
            <p>Continue communication with accepted study partners.</p>
            <button type="button" onClick={onChat}>Open Chat</button>
          </article>

          <article className="group-card">
            <h3>Logout</h3>
            <p>Return to the public start page.</p>
            <button type="button" onClick={onLogout}>Logout</button>
          </article>
        </div>
      </section>
    </>
  );
}

export default Dashboard;