import React from "react";

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
                <a href="#" onClick={(e) => e.stopPropagation()}>
                    ¿Has olvidado la contraseña?
                </a>
            </span>
            <input className="submit" type="submit" value="Iniciar Sesión" />
            <span className="span">
                ¿Todavía no tienes una cuenta?{" "}
                <a
                    href="#"
                    onClick={(e) => {
                        onSignupClick(e); // Llamada a la función pasada por props
                    }}
                >
                    Regístrate
                </a>
            </span>
        </div>
    );
};
