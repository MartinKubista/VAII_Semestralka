//import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

export function Header() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
            <Link className="navbar-brand fw-bold text-primary" to="/" >
                Bazarák
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo01">
                <ul className="navbar-nav allign-items-center gap-2"> 
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center" to="/">
                             🏠 <span className="ms-1">Domov</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center" to="/profile">
                             🧑 <span className="ms-1">Môj profil</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center" to="/register">
                             🚪 <span className="ms-1">Odhlásiť sa</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center" to="/login">
                             👤 <span className="ms-1">Prihlásiť sa</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="headerAddItem nav-link rounded text-light bg-primary fw-bold" to="/item">
                            Pridať nový inzerát
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

    );
}
export default Header;