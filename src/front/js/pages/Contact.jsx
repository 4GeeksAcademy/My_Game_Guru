import React, { useState } from "react";
import "../../styles/contact.css";

export const Contact = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        website: "",
        asunto: "",
        mensaje: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado:", formData);
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a un servidor.
    };

    return (
        <div className="contact_form">
            <div className="formulario">
                <h1>Formulario de contacto</h1>
                <h3>Escríbenos y en breve nos pondremos en contacto contigo</h3>

                <form onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor="nombre" className="colocar_nombre">Nombre
                            <span className="obligatorio">*</span>
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
                    </p>

                    <p>
                        <label htmlFor="email" className="colocar_email">Email
                            <span className="obligatorio">*</span>
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
                    </p>

                


                    <p>
                        <label htmlFor="asunto" className="colocar_asunto">Asunto
                            <span className="obligatorio">*</span>
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
                    </p>

                    <p>
                        <label htmlFor="mensaje" className="colocar_mensaje">Mensaje
                            <span className="obligatorio">*</span>
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
                    </p>

                    <button type="submit" name="enviar_formulario" id="enviar">
                        <p>Enviar</p>
                    </button>

                    <p className="aviso">
                        <span className="obligatorio"> * </span>los campos son obligatorios.
                    </p>
                </form>
            </div>
        </div>
    );
};
