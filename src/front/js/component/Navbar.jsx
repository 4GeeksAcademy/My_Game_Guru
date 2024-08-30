import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { Dropdown } from "./Dropdown";
import "../../styles/index.css";

export const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid d-flex align-items-center">
                    <Link
                        className="navbar-brand d-flex align-items-center"
                        to="/"
                    >
                        <img
                            src={logo}
                            width="76.64"
                            height="67.52"
                            className="d-inline-block align-text-top rotate-vertical"
                        />
                    </Link>
                    <Link
                        className="ms-3 text-decoration-none d-flex align-items-center"
                        to="/"
                    >
                        <span className="navbar-title">My Game Guru</span>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="dropdown-arrow">&#9660;</span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto d-flex align-items-center">
                            <li className="nav-item d-flex align-items-center">
                                <Link
                                    className="nav-link d-flex align-items-center"
                                    to="/favorites"
                                >
                                    <span className="navbar-text">
                                        Favoritos
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <Dropdown />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="divider2"></div>
        </>
    );
};
