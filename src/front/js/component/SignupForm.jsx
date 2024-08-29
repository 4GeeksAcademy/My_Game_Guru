import React, { useState, useContext } from "react";
import { ForbiddenPassword } from "./ForbiddenPassword";
import "../../styles/dropdown.css";
import { Context } from "../store/appContext";

export const SignupForm = ({ onSigninClick }) => {
    const [view, setView] = useState("signup");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
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
        onSigninClick(); // Llama a la función para cambiar a SigninForm
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
                    <span className="input-span">
                        <label htmlFor="username" className="label">
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={error ? "input-error" : ""}
                        />
                    </span>
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
                    <span className="input-span">
                        <label htmlFor="password2" className="label">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            name="password2"
                            id="password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            className={error ? "input-error" : ""}
                        />
                    </span>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        className="submit mt-3"
                        type="submit"
                        value="Registrarse"
                    />
                    <span className="span">
                        ¿Ya tienes una cuenta?&nbsp;{" "}
                        <a href="#" onClick={handleSigninClick}>
                            Inicia sesión
                        </a>
                    </span>
                </form>
            );
    }

    return content;
};
