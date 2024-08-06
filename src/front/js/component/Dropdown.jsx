import React, { useState } from "react";
import "../../styles/Dropdown.css";
import { ProfileCard } from "./ProfileCard";

export const Dropdown = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignupClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLogin(false);
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLogin(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Aquí deberías agregar la lógica de autenticación
        // Por ahora, simplemente simularemos un inicio de sesión exitoso
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsLogin(true);
    };

    if (isLoggedIn) {
        return <ProfileCard onLogout={handleLogout} />;
    }

    return (
        <form
            className="form"
            onClick={(e) => e.stopPropagation()} // Asegúrate de que el clic en el formulario no propague el evento
            onSubmit={handleSubmit}
        >
            {isLogin ? (
                <>
                    <span className="input-span">
                        <label htmlFor="email" className="label">
                            Correo electrónico
                        </label>
                        <input type="email" name="email" id="email" />
                    </span>
                    <span className="input-span">
                        <label htmlFor="password" className="label">
                            Contraseña
                        </label>
                        <input type="password" name="password" id="password" />
                    </span>
                    <span className="span">
                        <a href="#" onClick={(e) => e.stopPropagation()}>
                            ¿Has olvidado la contraseña?
                        </a>
                    </span>
                    <input
                        className="submit"
                        type="submit"
                        value="Iniciar Sesión"
                    />
                    <span className="span">
                        ¿Todavía no tienes una cuenta?{" "}
                        <a
                            href="#"
                            onClick={(e) => {
                                handleSignupClick(e);
                            }}
                        >
                            Regístrate
                        </a>
                    </span>
                </>
            ) : (
                <>
                    <span className="input-span required">
                        <label htmlFor="name" className="label">
                            Nombre de Usuario
                        </label>
                        <input type="text" name="name" id="name" required />
                    </span>
                    <span className="input-span required">
                        <label htmlFor="email" className="label">
                            Correo electrónico
                        </label>
                        <input type="email" name="email" id="email" required />
                    </span>
                    <span className="input-span required">
                        <label htmlFor="password" className="label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                        />
                    </span>

                    <span className="input-span required">
                        <label htmlFor="password" className="label">
                            Repetir contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                        />
                    </span>
                    <input
                        className="submit"
                        type="submit"
                        value="Regístrate"
                    />
                    <span className="span">
                        ¿Ya tienes una cuenta?{" "}
                        <a
                            href="#"
                            onClick={(e) => {
                                handleLoginClick(e);
                            }}
                        >
                            Inicia sesión
                        </a>
                    </span>
                </>
            )}
        </form>
    );
};
