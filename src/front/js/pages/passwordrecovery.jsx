import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../../styles/contact.css";
import "../../styles/dropdown.css";

export const PasswordRecovery = () => {
    const { store, actions} = useContext(Context);
    const [ params, setParams ] = useSearchParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado:", formData);
    };

    async function submitForm(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get("email");
        let password = formData.get("password");
        let passwordConfirm = formData.get("passwordConfirm");
        if(password == passwordConfirm){
            // let logged = await actions.login(email, password)
            let baseUrl = process.env.BACKEND_URL;
            let resp = await fetch(baseUrl + "/api/changepassword", {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + params.get("token")},
                body: JSON.stringify(password),
            })
            if (resp.ok){
                console.log("La clave fue cambiada con exito")
                navigate("/")
            }
        }else{
            alert("El password no coincide");
        }
    }

    return (
        <>
            <div className="main-container">
                <div className="contact-container">
                <p>Token: {params.get("token")}</p>
                    <div className="formulario">
                        <h3>Recuperacion de Password</h3>

                        <form onSubmit={submitForm}>
                            <div className="input-span">
                                <label htmlFor="email" className="label">
                                    Email
                                    <span className="obligatorio">&nbsp;*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="Escribe tu Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-span">
                                <label
                                    htmlFor="password"
                                    className="label"
                                >
                                    Nueva password
                                    <span className="obligatorio">&nbsp;*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    placeholder="Escribe tu nuevo password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-span">
                                <label
                                    htmlFor="passwordConfirm"
                                    className="label"
                                >
                                    Repite tu nuevo password
                                    <span className="obligatorio">&nbsp;*</span>
                                </label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    required
                                    placeholder="Repite tu nuevo password"
                                    value={formData.passwordConfirm}
                                    onChange={handleChange}
                                />
                            </div>

                            <input
                                className="submit mt-3"
                                type="submit"
                                value="Enviar"
                            />

                            <p className="aviso">
                                <span className="obligatorio"> * </span>los
                                campos son obligatorios.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
