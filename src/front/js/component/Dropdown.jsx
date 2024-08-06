import React, { useState, useRef, useEffect } from "react";
import "../../styles/Dropdown.css";

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const stayOpen = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={toggleDropdown}>
                Iniciar sesión
                <span className="dropdown-arrow">▼</span>
            </button>
            {isOpen && (
                <div className="dropdown-menu form">
                    <div>
                        <span className="input-span">
                            <label htmlFor="email" className="label">
                                Correo electrónico
                            </label>
                            <input type="email" name="email" id="email" />
                        </span>
                        <span className="input-span">
                            <label htmlFor="password" className="label">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                            />
                        </span>
                        <span className="span">
                            <a href="#">¿Has olvidado la contraseña?</a>
                        </span>
                        <input
                            className="submit mt-3"
                            type="submit"
                            value="Iniciar Sesión"
                        />
                        <span className="span">
                            ¿Todavía no tienes una cuenta?{" "}
                            <input
                                className="submit mt-3"
                                type="submit"
                                value="Regístrate"
                            />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
