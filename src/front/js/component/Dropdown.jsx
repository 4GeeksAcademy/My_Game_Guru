import React, { useState, useRef, useEffect, useContext } from "react";
import "../../styles/dropdown.css";
import { SigninForm } from "./SigninForm.jsx";
import { SignupForm } from "./SignupForm.jsx";
import { Context } from "../store/appContext.js";
import { ProfileCard } from "./ProfileCard.jsx";

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const { store, actions } = useContext(Context);
    const dropdownRef = useRef(null);

    const [buttonLabel, setButtonLabel] = useState(store.token ? "Perfil" : "Iniciar Sesion");

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
        // Si el usuario está autenticado, mostrar la tarjeta de perfil
        if (store.token) {
            setView("profileCard");
            setButtonLabel("Perfil");
        } else {
            setView("signin");
            setButtonLabel("Iniciar Sesion");
        }
        setIsOpen((prev) => !prev);
    }

    const [view, setView] = useState(store.token ? "profileCard" : "signin");

    useEffect(() => {
        // Actualizar el botón cuando cambie la vista
        if (view === "profileCard") {
            setButtonLabel("Perfil");
        } else if (view === "signup") {
            setButtonLabel("Registrarse");
        } else {
            setButtonLabel("Iniciar Sesion");
        }
    }, [view, store.token]);

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
