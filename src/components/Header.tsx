import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header>
      <Link className="logo" to="/">{title}</Link>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          {user ? (
            <>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><NavLink to="/search">Search</NavLink></li>
              <li><NavLink to="/requests">Requests</NavLink></li>
              <li><NavLink to="/chat">Chat</NavLink></li>
              <li><button className="link-button" type="button" onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
