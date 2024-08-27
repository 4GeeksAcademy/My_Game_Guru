import React, { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { SignupForm } from "./SignupForm";
import { SigninForm } from "./SigninForm";
import "../../styles/dropdown.css";

export const ForbiddenPassword = () => {
    const [view, setView] = useState("forgotPassword");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmitClick = (event) => {
        event.preventDefault();

        if (!email) {
            setError("Por favor, ingresa tu correo electrónico.");
            return;
        }

        setError("");
        setView("profileCard");
    };

    const handleSignupClick = (event) => {
        event.preventDefault();
        setView("signup"); // Cambia a "signup" para mostrar el SignupForm
    };

    const handleSigninClick = (event) => {
        event.preventDefault();
        setView("signin"); // Cambia a "signin" para mostrar el SigninForm
    };

    let content;
    switch (view) {
        case "profileCard":
            content = <ProfileCard />;
            break;
        case "signup":
            content = <SignupForm onSigninClick={() => setView("signin")} />;
            break;
        case "signin":
            content = <SigninForm onSignupClick={() => setView("signup")} />; // Pasa la función para cambiar a SignupForm
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={error ? "input-error" : ""}
                                required
                            />
                        </span>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            className="submit mt-3"
                            type="submit"
                            value="Restablecer contraseña"
                            onClick={handleSubmitClick}
                        />
                        <span className="span">
                            ¿Ya tienes una cuenta?&nbsp;{" "}
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
