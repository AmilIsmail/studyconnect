import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [program, setProgram] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(name, email, password, program);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <article>
        <h1>Create Your Account</h1>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full Name</label>
          <input id="register-name" value={name} onChange={(e) => setName(e.target.value)} required />

          <label htmlFor="register-email">HTWG Email</label>
          <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="register-password">Password</label>
          <input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label htmlFor="register-program">Study Program</label>
          <input id="register-program" value={program} onChange={(e) => setProgram(e.target.value)} required />

          <div className="button-row">
            <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
            <Link className="button-link secondary-btn" to="/">Back</Link>
          </div>
        </form>
      </article>
    </section>
  );
}

export default Register;
