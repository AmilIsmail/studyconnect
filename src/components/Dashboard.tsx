import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <>
      <section className="hero">
        <article>
          <h1>Welcome, {user?.name ?? "student"}</h1>
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
            <Link className="button-link" to="/search">Search Partners</Link>
          </article>

          <article className="group-card">
            <h3>Requests</h3>
            <p>Review study requests and accept or decline them.</p>
            <Link className="button-link" to="/requests">View Requests</Link>
          </article>

          <article className="group-card">
            <h3>Chat</h3>
            <p>Continue communication with accepted study partners.</p>
            <Link className="button-link" to="/chat">Open Chat</Link>
          </article>

          <article className="group-card">
            <h3>Logout</h3>
            <p>End your current JWT based session.</p>
            <button type="button" onClick={logout}>Logout</button>
          </article>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
