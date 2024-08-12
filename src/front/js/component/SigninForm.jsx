import React, { useState } from "react";
import { ForbiddenPassword } from "./ForbiddenPassword.jsx";
import { ProfileCard } from "./ProfileCard.jsx";
import "../../styles/Dropdown.css";

export const SigninForm = ({ onSignupClick }) => {
    const [view, setView] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleForgotPasswordClick = (event) => {
        event.preventDefault();
        setView("forgotPassword");
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        setError("");
        setView("profileCard");
    };

    const handleSignupClick = (event) => {
        event.preventDefault();
        onSignupClick();
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
                            <label htmlFor="email" className="label">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={error ? "input-error" : ""}
                            />
                        </span>
                        <span className="input-span">
                            <label htmlFor="password" className="label">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={error ? "input-error" : ""}
                            />
                        </span>
                        {error && <p className="error-message">{error}</p>}
                        <span className="span">
                            <a href="#" onClick={handleForgotPasswordClick}>
                                ¿Has olvidado la contraseña?
                            </a>
                        </span>
                        <input
                            className="submit mt-3"
                            type="submit"
                            value="Iniciar Sesión"
                            onClick={handleSubmitClick}
                        />
                        <span className="span">
                            ¿Todavía no tienes una cuenta?{" "}
                            <a href="#" onClick={handleSignupClick}>
                                Regístrate
                            </a>
                        </span>
                    </div>
                </div>
            );
    }

    return content;
};
