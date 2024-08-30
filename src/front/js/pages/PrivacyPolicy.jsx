import React from "react";
import { Link } from "react-router-dom";
import "../../styles/privacyPolicy.css";

export const PrivacyPolicy = () => {
    return (
        <div className="page-container">
            <div className="jumbotron">
                <h1 className="display-4 text-center font-title p-3">
                    Política de Privacidad de My Game Guru
                </h1>
            </div>
            <section className="card">
                <div className="container">
                    <div className="content">
                        <div className="textWrapper">
                            <div className="textContent">
                                <h2 className="font-title">Introducción:</h2>
                                <p className="font-text">
                                    En My Game Guru, valoramos y respetamos tu
                                    privacidad. Esta Política de Privacidad
                                    describe cómo recopilamos, utilizamos y
                                    protegemos tu información personal cuando
                                    usas nuestro sitio web.
                                </p>
                                <h2 className="font-title">
                                    Información que Recopilamos:
                                </h2>
                                <p className="font-text">
                                    Recopilamos información personal que nos
                                    proporcionas directamente, como tu nombre y
                                    correo electrónico, así como datos que se
                                    generan al interactuar con nuestras API de
                                    Steam y OpenAI.
                                </p>
                                <h2 className="font-title">
                                    Cómo Usamos tu Información:
                                </h2>
                                <p className="font-text">
                                    Utilizamos la información que recopilamos
                                    para personalizar las recomendaciones de
                                    juegos, mejorar nuestros servicios y
                                    comunicarnos contigo sobre actualizaciones o
                                    promociones.
                                </p>
                                <h2 className="font-title">
                                    Protección de tu Información:
                                </h2>
                                <p className="font-text">
                                    Implementamos medidas de seguridad adecuadas
                                    para proteger tu información personal contra
                                    accesos no autorizados y usos indebidos.
                                </p>
                                <h2 className="font-title">
                                    Compartir tu Información:
                                </h2>
                                <p className="font-text">
                                    No compartimos tu información personal con
                                    terceros, excepto cuando sea necesario para
                                    cumplir con la ley o proteger nuestros
                                    derechos.
                                </p>
                                <h2 className="font-title">Tus Derechos:</h2>
                                <p className="font-text">
                                    Tienes el derecho de acceder, corregir o
                                    eliminar tu información personal en
                                    cualquier momento. También puedes optar por
                                    no recibir nuestras comunicaciones.
                                </p>
                                <h2 className="font-title">
                                    Cambios a esta Política:
                                </h2>
                                <p className="font-text">
                                    Podemos actualizar esta Política de
                                    Privacidad ocasionalmente. Te notificaremos
                                    sobre cualquier cambio a través de nuestro
                                    sitio web o por correo electrónico.
                                </p>
                                <Link to="/">
                                    <span
                                        className="submit"
                                        role="button"
                                    >
                                        Volver a la página principal
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
