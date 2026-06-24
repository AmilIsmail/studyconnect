import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("test@htwg-konstanz.de");
  const [password, setPassword] = useState("test1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <article>
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="login-password">Password</label>
          <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="button-row">
            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            <Link className="button-link secondary-btn" to="/">Back</Link>
          </div>
        </form>
      </article>
    </section>
  );
}

export default Login;
