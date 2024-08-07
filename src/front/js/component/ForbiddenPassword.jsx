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
                        <p className="par-color">
                            Rellena tu correo electrónico y te enviaremos un
                            enlace para restablecer la contraseña si encontramos
                            tu correo en nuestra base de datos.
                        </p>
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
                        <input
                            className="submit mt-3"
                            type="submit"
                            value="Restablecer contraseña"
                            // onClick={handleSubmitClick}
                        />
                    </div>
                </div>
            );
    }

    return content;
};
