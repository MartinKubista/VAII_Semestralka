import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import homeIcon from "../assets/home.png";
import logoutIcon from "../assets/logout.png";
import profileIcon from "../assets/profile.png";
import adminPanelIcon from "../assets/admin_panel.png";
import './Header.css';

export function Header() {
    const { isLoggedIn, user, logout} = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 d-flex">
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

      <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo01">
        <ul className="navbar-nav align-items-center gap-2">

          <li className="nav-item">
            <Link className="nav-link nav-link-icon d-flex" to="/">
              <img src={homeIcon} alt="" />
              <span>Domov</span>
            </Link>
          </li>

          {isLoggedIn && user?.role === "admin" && (
            <li className="nav-item">
              <Link className="nav-link nav-link-icon d-flex" to="/admin">
                <img src={adminPanelIcon} alt="" />
                <span>Admin panel</span>
              </Link>
            </li>
          )}

          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link nav-link-icon d-flex" to={`/profile/${user?.id_user}`}>
                  <img src={profileIcon} alt="" />
                  <span>{user?.name}</span>
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link nav-link-icon d-flex"
                  type="button"
                  onClick={logout}
                >
                  <img src={logoutIcon} alt="" />
                  <span>Odhlásiť sa</span>
                </button>
              </li>

              <li className="nav-item ms-2">
                <Link
                  className="btn btn-primary fw-bold px-3 d-flex"
                  to="/add-item"
                >
                  + Pridať inzerát
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link nav-link-icon d-flex" to="/login">
                  <img src={profileIcon} alt="" />
                  <span>Prihlásiť sa</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-link-icon d-flex" to="/register">
                  <img src={profileIcon} alt="" />
                  <span>Registrovať</span>
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