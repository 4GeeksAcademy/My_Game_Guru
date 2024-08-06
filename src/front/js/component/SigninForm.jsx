import React from "react";
import "../../styles/form.css";

export const SigninForm = () => {
    return (
        <div>
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
                <a href="#">¿Has olvidado la contraseña?</a>
            </span>
            <input
                className="submit mt-3"
                type="submit"
                value="Iniciar Sesión"
            />
            <span className="span">
                ¿Todavía no tienes una cuenta?{" "}
                <input
                    className="submit mt-3"
                    type="submit"
                    value="registrate"
                />
                <a href="#">¿Has olvidado la contraseña?</a>
            </span>
        </div>
    );
};
