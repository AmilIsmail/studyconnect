interface RegisterProps {
  onRegister: () => void;
  onBack: () => void;
}

function Register({ onRegister, onBack }: RegisterProps) {
  return (
    <section>
      <article>
        <h1>Create Your Account</h1>

        <label>Full Name</label>
        <input type="text" placeholder="Your full name" />

        <label>HTWG Email</label>
        <input type="email" placeholder="name@htwg-konstanz.de" />

        <label>Study Program</label>
        <input type="text" placeholder="e.g. Applied Informatics" />

        <div className="button-row">
          <button type="button" onClick={onRegister}>Create Account</button>
          <button type="button" className="secondary-btn" onClick={onBack}>
            Back
          </button>
        </div>
      </article>
    </section>
  );
}

export default Register;