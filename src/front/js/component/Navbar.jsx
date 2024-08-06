import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { LoginForm } from "./LoginForm.jsx";

export const Navbar = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand ms-3" to="/">
                        <img
                            src={logo}
                            alt="Logo"
                            width="76.64"
                            height="67.52"
                            className="d-inline-block align-text-top"
                        />
                    </Link>
                    <Link className="ms-3 text-decoration-none" to="/">
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
                    <Link className="text-decoration-none" to="/login">
                        <span className="navbar-text ms-5">
                            Mis valoraciones
                        </span>
                    </Link>
                    <div className="dropdown me-3">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="loginDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="navbar-text ms-5 login-button">
                                Login
                            </span>
                        </button>
                        <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="loginDropdown"
                        >
                            <div className="px-4 py-3">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
