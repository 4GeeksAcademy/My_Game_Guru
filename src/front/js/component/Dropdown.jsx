// Dropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import "../../styles/Dropdown.css";
import { SigninForm } from "./SigninForm.jsx";
import { SignupForm } from "./SignupForm.jsx";

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState("signin");
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

    const handleSignupClick = () => {
        setView("signup");
    };

    const handleSigninClick = () => {
        setView("signin");
    };

    let content;
    switch (view) {
        case "signin":
            content = <SigninForm onSignupClick={handleSignupClick} />;
            break;
        case "signup":
            content = <SignupForm onSigninClick={handleSigninClick} />;
            break;
        default:
            content = <SigninForm onSignupClick={handleSignupClick} />;
    }

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={toggleDropdown}>
                {view === "signin" ? "Iniciar sesión" : "Regístrate"}
                <span className="dropdown-arrow">▼</span>
            </button>
            {isOpen && content}
        </div>
    );
};
