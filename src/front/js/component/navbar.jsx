import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export const Navbar = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand" to="/">
                        <img
                            src={logo}
                            alt="Logo"
                            width="76.64"
                            height="67.52"
                            className="d-inline-block align-text-top"
                        />
                    </Link>
                    <Link className="ms-3 text-decoration-none" to="/some-page">
                        <span className="navbar-text">My Game Gurú</span>
                    </Link>
                </div>
                <div className="d-flex">
                    <Link
                        className="ms-3 text-decoration-none"
                        to="/another-page"
                    >
                        <span className="navbar-text">Recomendaciones</span>
                    </Link>
                    <Link className="" to="/login">
                        <span className="navbar-text ms-5">
                            Mis valoraciones
                        </span>
                    </Link>
                    <Link className="" to="/login">
                        <span className="navbar-text ms-5">Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
