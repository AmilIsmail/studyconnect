import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <article>
        <h1>Find your perfect study partner at HTWG Konstanz</h1>
        <p>
          StudyConnect helps students find partners by faculty, program,
          semester and module. The app uses a React SPA, an Express API and
          persistent SQLite data.
        </p>

        <div className="button-row">
          <Link className="button-link" to="/login">Login</Link>
          <Link className="button-link secondary-btn" to="/register">Register</Link>
        </div>
      </article>
    </section>
  );
}

export default Home;
