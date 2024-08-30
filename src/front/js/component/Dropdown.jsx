import React, { useState, useRef, useEffect, useContext } from "react";
import "../../styles/dropdown.css";
import { SigninForm } from "./SigninForm";
import { SignupForm } from "./SignupForm";
import { Context } from "../store/appContext";
import { ProfileCard } from "./ProfileCard";

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { store, actions } = useContext(Context);
    const dropdownRef = useRef(null);

    const [buttonLabel, setButtonLabel] = useState(
        store.token ? "Perfil" : "Iniciar Sesion"
    );

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
    useEffect(() => {
        // Escuchar cambios en store.token y actualizar el buttonLabel
        if (store.token) {
            setButtonLabel("Perfil");
            setView("profileCard");
        } else {
            setButtonLabel("Iniciar Sesion");
            setView("signin");
        }
    }, [store.token]);
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const [view, setView] = useState(store.token ? "profileCard" : "signin");

    const handleSignupClick = () => {
        setView("signup");
    };

    const handleSigninClick = () => {
        setView("signin");
    };
    const handleProfileClick = () => {
        setView("profileCard");
    };

    let content;

    switch (view) {
        case "profileCard":
            content = <ProfileCard />;
            break;
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
                {buttonLabel}
                <span className="dropdown-arrow">▼</span>
            </button>
            {isOpen && content}
        </div>
    );
};