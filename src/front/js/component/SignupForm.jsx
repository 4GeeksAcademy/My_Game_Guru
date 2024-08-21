import React, { useState, useContext } from "react";
import { ForbiddenPassword } from "./ForbiddenPassword.jsx";
import "../../styles/Dropdown.css";
import { Context } from "../store/appContext.js";

export const SignupForm = ({ onSigninClick }) => {
    const [view, setView] = useState("signup");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const { actions } = useContext(Context);

    const handleSubmitClick = async (event) => {
        event.preventDefault();

        if (!username || !email || !password || !password2) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        if (password !== password2) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch(
                process.env.BACKEND_URL + "/api/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );

            if (response.ok) {
                setSuccessMessage(
                    "¡Tu registro ha sido exitoso! Por favor, inicia sesión."
                );
                setError("");
                setView("success");
                actions.setRegistrationSuccess(true);
            } else {
                // Manejo de errores específicos según el código de estado HTTP
                const data = await response.json();
                if (response.status === 409) {
                    setError(data.msg); // Mensaje de error del backend
                } else {
                    setError(
                        "Error en el registro. Por favor, intenta nuevamente."
                    );
                }
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setError("Error en la conexión. Por favor, intenta nuevamente.");
        }
    };

    const handleSigninClick = (event) => {
        event.preventDefault();
        onSigninClick();
    };

    let content;
    switch (view) {
        case "forgotPassword":
            content = <ForbiddenPassword />;
            break;
        case "success":
            content = (
                <>
                    {successMessage && (
                        <p className="form dropdown-menu success-message">
                            {successMessage}
                            <button
                                className="submit mt-3"
                                onClick={handleSigninClick}
                            >
                                Iniciar Sesión
                            </button>
                        </p>
                    )}
                </>
            );
            break;
        default:
            content = (
                <form
                    className="dropdown-menu form"
                    onSubmit={handleSubmitClick}
                >
                    <div>
                        <span className="input-span">
                            <label
                                htmlFor="name"
                                className="label required-label"
                            >
                                Nombre de usuario{" "}
                                <span className="asterisk">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={error ? "input-error" : ""}
                                required
                            />
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={error ? "input-error" : ""}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={error ? "input-error" : ""}
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
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                className={error ? "input-error" : ""}
                                required
                            />
                        </span>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            className="submit mt-3"
                            type="submit"
                            value="Regístrate"
                        />
                        <span className="span">
                            ¿Ya tienes una cuenta?{" "}
                            <a href="#" onClick={handleSigninClick}>
                                Inicia Sesión
                            </a>
                        </span>
                    </div>
                </form>
            );
    }

    return content;
};
