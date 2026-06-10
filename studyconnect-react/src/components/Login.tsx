interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
}

function Login({ onLogin, onBack }: LoginProps) {
  return (
    <section>
      <article>
        <h1>Login</h1>

        <label>Email</label>
        <input type="email" placeholder="name@htwg-konstanz.de" />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" />

        <div className="button-row">
          <button type="button" onClick={onLogin}>Login</button>
          <button type="button" className="secondary-btn" onClick={onBack}>
            Back
          </button>
        </div>
      </article>
    </section>
  );
}

export default Login;