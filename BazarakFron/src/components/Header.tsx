import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Header.css';

export function Header() {
    const { isLoggedIn, user, logout, loading } = useAuth();
    if (loading) return null; 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link className="navbar-brand fw-bold text-primary" to="/">
        Bazarák
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarTogglerDemo01"
      >
        <ul className="navbar-nav allign-items-center gap-2">
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center shadow-sm" to="/">
              🏠 <span className="ms-1">Domov</span>
            </Link>
          </li>

          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center shadow-sm"
                  to="/profile"
                >
                  🧑 <span className="ms-1">{user?.name}</span>
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center shadow-sm btn"
                  onClick={logout}
                >
                  🚪 <span className="ms-1">Odhlásiť sa</span>
                </button>
              </li>

              <li className="nav-item">
                <Link
                  className="headerAddItem nav-link rounded text-light bg-primary fw-bold"
                  to="/add-item"
                >
                  Pridať nový inzerát
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center shadow-sm"
                  to="/login"
                >
                  👤 <span className="ms-1">Prihlásiť sa</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center shadow-sm"
                  to="/register"
                >
                  👤 <span className="ms-1">Registrovať</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Header;