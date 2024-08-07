import React, { useState } from "react";
import { ProfileCard } from "./ProfileCard.jsx";
import { SignupForm } from "./SignupForm.jsx";
import "../../styles/Dropdown.css";

export const ForbiddenPassword = () => {
    const [view, setView] = useState("signin");

    const handleForgotPasswordClick = (event) => {
        event.preventDefault();
        setView("forgotPassword");
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();
        setView("profileCard");
    };

    const handleSignupClick = (event) => {
        event.preventDefault();
        setView("signup");
    };

    let content;
    switch (view) {
        case "forgotPassword":
            content = <ForbiddenPassword />;
            break;
        case "profileCard":
            content = <ProfileCard />;
            break;
        case "signup":
            content = <SignupForm onLoginClick={() => setView("signin")} />;
            break;
        default:
            content = (
                <div className="dropdown-menu form">
                    <div>
                        <span className="input-span">
                            <label htmlFor="email" className="label">
                                RECUPERAR CONTRASEÑA
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
