import React, { useState, useRef, useEffect } from "react";
import "../../styles/Dropdown.css";
import { SigninForm } from "./SigninForm.jsx";

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

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={toggleDropdown}>
                Iniciar sesión
                <span className="dropdown-arrow">▼</span>
            </button>
            {isOpen && <SigninForm />}
        </div>
    );
};
