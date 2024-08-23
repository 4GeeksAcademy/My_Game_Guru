import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Aboutus = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    return (
        <div className="jumbotron">
            <h1 className="display-4">#Sobre My Game Guru</h1>
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/925e67e29126fc2a39f865c09a3e81abb981830d056e2dc31ef0cb3e333c35fa?apiKey=001bde4c6b2a499891ace6677fe08678&&apiKey=001bde4c6b2a499891ace6677fe08678"
                className="gameImage"
                alt="Game suggestion visual"
            />
            <hr className="my-4" />
            <h2>Quiénes Somos:</h2>
            <p>
                My Game Guru es tu destino definitivo para la busqueda de
                recomendaciones de Juegos. Fundado en 2024 por un grupo de
                desarrolladores, nuestro equipo está compuesto por apasionados
                gamers y profesionales con años de experiencia en análisis de
                juegos.
            </p>
            <br></br>
            <h2>Nuestra Misión:</h2>
            <p>
                En My Game Guru, nuestra misión es proporcionar a los gamers las
                herramientas y conocimientos necesarios para mejorar su
                experiencia de juego y alcanzar nuevos niveles de experiencia.
                Nos dedicamos a recomendarte los mejores juegos, para cuando
                encuentres esos momentos de no saber que jugar.
            </p>
            <br></br>
            <h2>Nuestro Enfoque:</h2>
            <p>
                Lo que nos diferencia es que utilizamos herramientas con
                inteligencia artificial para lograr los mejores resultados para
                tus recomendaciones. Trabajamos arduamente para asegurarnos de
                que cada pieza de contenido que creamos sea útil, precisa y
                actualizada.
            </p>
            <h2>Contacto:</h2>
            <p>
                Si tienes alguna pregunta o necesitas más información, no dudes
                en enviarnos un correo electrónico a MyGameGuru@gmail.com o
                llenar nuestro formulario de contacto en la página de
                contacto".
            </p>

            <Link to="/">
                <span className="btn btn-primary btn-lg" href="/" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};
