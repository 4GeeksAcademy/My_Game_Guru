import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { Dropdown } from "./Dropdown.jsx";

export const Navbar = () => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                // Implementa lógica para cerrar el dropdown aquí
                console.log("Click fuera del dropdown");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                        <span className="navbar-text">My Game Guru</span>
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
                        <span className="navbar-text ms-3">
                            Mis valoraciones
                        </span>
                    </Link>
                    <Dropdown />
                </div>
            </div>
        </nav>
    );
};
