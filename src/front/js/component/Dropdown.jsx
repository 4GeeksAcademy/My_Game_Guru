import React, { useState, useRef, useEffect, useContext } from "react";
import "../../styles/dropdown.css";
import { SigninForm } from "./SigninForm.jsx";
import { SignupForm } from "./SignupForm.jsx";
import { Context } from "../store/appContext.js";

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { store, actions } = useContext(Context);
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
        // Toggle the dropdown and set the view accordingly
        if (store.registrationSuccess) {
            // If registration was successful, ensure we switch to signin form
            setView("signin");
            actions.setRegistrationSuccess(false);
        } else {
            setIsOpen((prev) => !prev);
        }
    };

    const [view, setView] = useState("signin");

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
                {store.registrationSuccess
                    ? "Iniciar sesión"
                    : view === "signin"
                    ? "Iniciar sesión"
                    : "Regístrate"}
                <span className="dropdown-arrow">▼</span>
            </button>
            {isOpen && content}
        </div>
    );
};
