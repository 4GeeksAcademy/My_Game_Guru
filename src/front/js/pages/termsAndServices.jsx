import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/termsAndServices.css";

export const TermsAndServices = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    return (
        <div className="terms-container">
            <div className="jumbotron">
                <h1 className="display-4 text-center font-title p-3">Términos y Servicios de My Game Guru</h1>
            </div>
            <section className="card">
                <div className="container">
                    <div className="content">
                        <div className="textWrapper">
                            <div className="textContent">
                                <h2 className="font-title">Términos y Condiciones:</h2>
                                <p className="font-text">
                                    Al utilizar My Game Guru, aceptas nuestros términos y condiciones. Por favor, lee cuidadosamente los siguientes términos antes de utilizar nuestra página web.
                                </p>
                                <h2 className="font-title">Servicios:</h2>
                                <p className="font-text">
                                    My Game Guru ofrece recomendaciones de juegos personalizadas basadas en la información recopilada de las API de Steam y OpenAI. Los usuarios podrán acceder a información detallada sobre los juegos, incluyendo descripciones, imágenes y videos. La página web ofrece una función de búsqueda avanzada para que los usuarios puedan encontrar juegos que se ajusten a sus intereses y preferencias.
                                </p>
                                <h2 className="font-title">Privacidad:</h2>
                                <p className="font-text">
                                    My Game Guru se compromete a proteger la privacidad de los usuarios y no compartirá información personal con terceros sin su consentimiento. Los usuarios son responsables de mantener la seguridad de sus cuentas de Steam y OpenAI, y no compartirán sus credenciales con nadie.
                                </p>
                                <h2 className="font-title">Seguridad:</h2>
                                <p className="font-text">
                                    My Game Guru utiliza medidas de seguridad adecuadas para proteger la información de los usuarios y prevenir el acceso no autorizado a las API. Los usuarios serán notificados en caso de cualquier violación de seguridad o acceso no autorizado a sus cuentas.
                                </p>
                                <h2 className="font-title">Uso de las API:</h2>
                                <p className="font-text">
                                    My Game Guru utiliza las API de Steam y OpenAI de acuerdo con los términos y condiciones establecidos por cada proveedor. My Game Guru se compromete a no utilizar las API para fines malintencionados o que violen los términos y condiciones establecidos.
                                </p>
                                <h2 className="font-title">Protección contra el fraude:</h2>
                                <p className="font-text">
                                    My Game Guru tomará medidas para prevenir el fraude y el phishing, incluyendo la verificación de la identidad de los usuarios y la detección de actividades sospechosas. Los usuarios serán notificados en caso de cualquier actividad sospechosa en sus cuentas.
                                </p>
                                <Link to="/">
                                    <span className="submit" role="button">
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