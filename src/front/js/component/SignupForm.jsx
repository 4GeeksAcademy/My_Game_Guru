import React, { useState } from "react";
import { ForbiddenPassword } from "./ForbiddenPassword.jsx";
import { ProfileCard } from "./ProfileCard.jsx";
import "../../styles/Dropdown.css";

export const SignupForm = ({ onSigninClick }) => {
    const [view, setView] = useState("signup");

    const handleForgotPasswordClick = (event) => {
        event.preventDefault();
        setView("forgotPassword");
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();
        setView("profileCard");
    };

    const handleSigninClick = (event) => {
        event.preventDefault();
        onSigninClick(); // Llamar a la función pasada como prop
    };

    let content;
    switch (view) {
        case "forgotPassword":
            content = <ForbiddenPassword />;
            break;
        case "profileCard":
            content = <ProfileCard />;
            break;
        default:
            content = (
                <div className="dropdown-menu form">
                    <div>
                        <span className="input-span">
                            <label
                                htmlFor="name"
                                className="label required-label"
                            >
                                Nombre de usuario{" "}
                                <span className="asterisk">*</span>
                            </label>
                            <input type="text" name="name" id="name" required />
                        </span>
                        <span className="input-span">
                            <label
                                htmlFor="email"
                                className="label required-label"
                            >
                                Correo electrónico{" "}
                                <span className="asterisk">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                            />
                        </span>
                        <span className="input-span">
                            <label
                                htmlFor="password"
                                className="label required-label"
                            >
                                Contraseña <span className="asterisk">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                            />
                        </span>
                        <span className="input-span">
                            <label
                                htmlFor="password2"
                                className="label required-label"
                            >
                                Repite la contraseña{" "}
                                <span className="asterisk">*</span>
                            </label>
                            <input
                                type="password"
                                name="password2"
                                id="password2"
                                required
                            />
                        </span>
                        <input
                            className="submit mt-3"
                            type="submit"
                            value="Regístrate"
                            // onClick={handleSubmitClick}
                        />
                        <span className="span">
                            ¿Ya tienes una cuenta?{" "}
                            <a href="#" onClick={handleSigninClick}>
                                Inicia Sesión
                            </a>
                        </span>
                    </div>
                </div>
            );
    }

    return content;
};
