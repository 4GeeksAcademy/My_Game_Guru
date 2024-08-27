import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ForbiddenPassword } from "./ForbiddenPassword";
import { ProfileCard } from "./ProfileCard";
import "../../styles/dropdown.css";

export const SigninForm = ({ onSignupClick }) => {
    const { actions } = useContext(Context);
    const [view, setView] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleForgotPasswordClick = (event) => {
        event.preventDefault();
        setView("forgotPassword");
    };

    const handleSubmitClick = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        const success = await actions.login(email, password);

        if (success) {
            setView("profileCard");
        } else {
            setError("Correo electrónico o contraseña incorrectos.");
        }
    };

    const handleSignupClick = (event) => {
        event.preventDefault();
        onSignupClick(); // Llama a la función para cambiar a SignupForm
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
                        ¿Todavía no tienes una cuenta?&nbsp;{" "}
                        <a href="#" onClick={handleSignupClick}>
                            Regístrate
                        </a>
                    </span>
                </div>
            );
    }

    return content;
};
