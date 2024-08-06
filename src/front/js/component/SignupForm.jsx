import React from "react";

export const SignupForm = ({ onLoginClick }) => {
    return (
        <div>
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
                <input type="password" name="password" id="password" required />
            </span>
            <span className="input-span required">
                <label htmlFor="repeat-password" className="label">
                    Repetir contraseña
                </label>
                <input
                    type="password"
                    name="repeat-password"
                    id="repeat-password"
                    required
                />
            </span>
            <input className="submit" type="submit" value="Regístrate" />
            <span className="span">
                ¿Ya tienes una cuenta?{" "}
                <a
                    href="#"
                    onClick={(e) => {
                        onLoginClick(e); // Llamada a la función pasada por props
                    }}
                >
                    Inicia sesión
                </a>
            </span>
        </div>
    );
};
