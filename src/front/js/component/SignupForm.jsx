
import React, { useState } from "react";
import { ForbiddenPassword } from "./ForbiddenPassword.jsx";
import { ProfileCard } from "./ProfileCard.jsx";
import "../../styles/Dropdown.css";

export const SignupForm = ({ onSigninClick }) => {
    // Estados para controlar los valores del formulario
    const [view, setView] = useState("signup");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    // Función para manejar el cambio de vista a "Forgot Password"
    const handleForgotPasswordClick = (event) => {
        event.preventDefault();
        setView("forgotPassword");
    };

    // Función para manejar el envío del formulario
    const handleSubmitClick = async (event) => {
        event.preventDefault();

        // Validación simple para asegurarse de que las contraseñas coincidan
        if (password !== password2) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            // Enviamos los datos al backend usando fetch y await
            const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                })
            });

            // Si la respuesta es exitosa, cambiamos la vista a "profileCard"
            if (response.ok) {
                setView("profileCard");
            } else {
                // Si hubo un error, mostramos un mensaje de error en la consola
                console.error("Error en el registro");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    // Función para cambiar la vista a "signin"
    const handleSigninClick = (event) => {
        event.preventDefault();
        onSigninClick(); // Llama a la función pasada como prop para cambiar la vista
    };

    // Renderizamos el contenido según la vista actual
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
                // Aquí colocamos los campos del formulario dentro de un elemento <form>
                <form className="dropdown-menu form" onSubmit={handleSubmitClick}>
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
                                required
                            />
                        </span>
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
