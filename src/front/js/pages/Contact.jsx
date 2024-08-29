import React, { useState } from "react";
import "../../styles/contact.css";
import "../../styles/dropdown.css";

export const Contact = () => {
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
                                <label htmlFor="nombre" className="label">
                                    Nombre
                                    <span className="obligatorio">&nbsp;*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    required
                                    placeholder="Escribe tu nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>

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
                                <label htmlFor="asunto" className="label">
                                    Asunto
                                    <span className="obligatorio">&nbsp;*</span>
                                </label>
                                <input
                                    type="text"
                                    name="asunto"
                                    id="asunto"
                                    required
                                    placeholder="Escribe un asunto"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-span">
                                <label htmlFor="mensaje" className="label">
                                    Mensaje
                                    <span className="obligatorio">&nbsp;*</span>
                                </label>
                                <textarea
                                    name="mensaje"
                                    className="texto_mensaje"
                                    id="mensaje"
                                    required
                                    placeholder="Deja aquí tu comentario..."
                                    value={formData.mensaje}
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
