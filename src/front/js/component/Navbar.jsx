import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { Dropdown } from "./Dropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";
import "../../styles/index.css";

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
                            className="d-inline-block align-text-top rotate-vertical"
                        />
                    </Link>
                    <Link className="ms-3 text-decoration-none" to="/">
                        <span className="navbar-text">My Game Guru</span>
                    </Link>
                </div>
                <div className="d-flex align-items-center">
                    <Link className="ms-3 text-decoration-none" to="/favorites">
                        <span className="navbar-text">Favoritos</span>
                    </Link>
                    <Link className="text-decoration-none ms-3" to="/login">
                        <span className="navbar-text">Mis valoraciones</span>
                    </Link>
                    <Dropdown />
                    <ThemeSwitcher />
                </div>
            </div>
        </nav>
    );
};
