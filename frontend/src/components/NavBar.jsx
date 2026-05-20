import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">

      <h1 className="navbar-logo">
        TurnosApp
      </h1>

      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/">Servicios</Link>
        </li>
        <li>
          <Link to="/">Reservar</Link>
        </li>
      </ul>

      <Link to="/login">
        <button className="navbar-button">
          Login
        </button>
      </Link>

      <Link to="/dashboard">
        <button className="navbar-button">
          Dashboard
        </button>
      </Link>
    </nav>
  );
}

export default NavBar;