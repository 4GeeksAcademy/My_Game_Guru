import React from "react";
import "../../styles/Profilecard.css";

export const ProfileCard = () => {
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
        setView("signup");
    };

    let content;
    switch (view) {
        case "profileCard":
            content = <ProfileCard />;
            break;
        case "signup":
            content = <SignupForm onSigninClick={() => setView("signin")} />;
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
                            ¿Todavía no tienes una cuenta?{" "}
                            <a href="#" onClick={handleSignupClick}>
                                Regístrate
                            </a>
                        </span>
                    </div>
                </div>
            );
    }

    return content;
};
