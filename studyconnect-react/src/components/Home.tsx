interface HomeProps {
  onLogin: () => void;
  onRegister: () => void;
}

function Home({ onLogin, onRegister }: HomeProps) {
  return (
    <section className="hero">
      <article>
        <h1>Find your perfect study partner at HTWG Konstanz</h1>
        <p>
          StudyConnect helps students find partners by faculty, program,
          semester and module.
        </p>

        <div className="button-row">
          <button type="button" onClick={onLogin}>Login</button>
          <button type="button" className="secondary-btn" onClick={onRegister}>
            Register
          </button>
        </div>
      </article>
    </section>
  );
}

export default Home;