import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const GameCard = ({ appId }) => {
    const { actions } = useContext(Context);
    const [gameInfo, setGameInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameInfo = async () => {
            try {
                const data = await actions.fetchGameInfo(appId);
                if (data) {
                    setGameInfo(data);
                    setError(null);
                } else {
                    setError("No se encontró información del juego");
                }
            } catch (err) {
                setError("Error al cargar la información");
            } finally {
                setLoading(false);
            }
        };

        fetchGameInfo();
    }, [appId]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (!gameInfo) return <div>No se encontró información del juego</div>;

    return (
        <div className="game-card">
            <h2>{gameInfo.name}</h2>
            {gameInfo.header_image && (
                <img src={gameInfo.header_image} alt={gameInfo.name} />
            )}
            <p>{gameInfo.short_description}</p>
            <p>
                Desarrollador:{" "}
                {gameInfo.developers && gameInfo.developers.length > 0
                    ? gameInfo.developers.join(", ")
                    : "Información no disponible"}
            </p>
            <p>
                Publicado por:{" "}
                {gameInfo.publishers && gameInfo.publishers.length > 0
                    ? gameInfo.publishers.join(", ")
                    : "Información no disponible"}
            </p>
            <p>Fecha de lanzamiento: {gameInfo.release_date?.date || "N/A"}</p>
            {gameInfo.metacritic && (
                <p>Puntuación Metacritic: {gameInfo.metacritic.score}</p>
            )}
            <p>
                Géneros:{" "}
                {gameInfo.genres && gameInfo.genres.length > 0
                    ? gameInfo.genres
                          .map((genre) => genre.description)
                          .join(", ")
                    : "Información no disponible"}
            </p>
        </div>
    );
};

GameCard.propTypes = {
    appId: PropTypes.number.isRequired,
};
