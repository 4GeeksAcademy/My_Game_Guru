import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";  // Asegúrate de que esta ruta sea correcta
import { ForbiddenPassword } from "./ForbiddenPassword.jsx";
import { ProfileCard } from "./ProfileCard.jsx";
import "../../styles/dropdown.css";

export const SigninForm = ({ onSignupClick }) => {
    // Obtener las acciones del contexto usando useContext
    const { actions } = useContext(Context);

    // Estados locales para manejar el estado de la vista, email, contraseña y error
    const [view, setView] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Función para manejar el clic en "¿Has olvidado la contraseña?"
    const handleForgotPasswordClick = (event) => {
        event.preventDefault();
        setView("forgotPassword");
    };

    // Función para manejar el clic en "Iniciar Sesión"
    const handleSubmitClick = async (event) => {
        event.preventDefault();

        // Validación básica para asegurarse de que los campos no estén vacíos
        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        // Llamada a la acción login con las credenciales del usuario
        const success = await actions.login(email, password);
        
        // Si el login es exitoso, cambia la vista al perfil del usuario
        if (success) {
            setView("profileCard");
        } else {
            // Si falla, muestra un mensaje de error
            setError("Correo electrónico o contraseña incorrectos.");
        }
    };

    // Función para manejar el clic en "Regístrate"
    const handleSignupClick = (event) => {
        event.preventDefault();
        onSignupClick();
    };

    // Renderizado condicional basado en el estado de la vista
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
                            onClick={handleSubmitClick} // Asocia el clic con la función handleSubmitClick
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

    // Retorno del contenido basado en la vista actual
    return content;
};
