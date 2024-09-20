import React, { useState } from "react";
import "../../styles/contact.css";
import "../../styles/dropdown.css";

export const PasswordRecovery = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        website: "",
        asunto: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado:", formData);
    };

    return (
        <>
            <div className="main-container">
                <div className="contact-container">
                    <div className="formulario">
                        <h3>Contáctanos</h3>

                        <form onSubmit={handleSubmit}>
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
                                    htmlFor="nuevopassword"
                                    className="label"
                                >
                                    Nueva password
                                    <span className="obligatorio">&nbsp;*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nuevopassword"
                                    id="nuevopassword"
                                    required
                                    placeholder="Escribe tu nuevo password"
                                    value={formData.nuevopassword}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-span">
                                <label
                                    htmlFor="nuevopassword2"
                                    className="label"
                                >
                                    Repite tu nuevo password
                                    <span className="obligatorio">&nbsp;*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nuevopassword2"
                                    id="nuevopassword2"
                                    required
                                    placeholder="Repite tu nuevo password"
                                    value={formData.nuevopassword2}
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
