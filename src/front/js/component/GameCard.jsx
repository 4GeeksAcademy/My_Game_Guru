import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/gamecard.css";

export const GameCard = ({ appId }) => {
    const { actions } = useContext(Context);
    const [gameInfo, setGameInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const data = await actions.fetchGameInfo(appId);
                if (data) {
                    setGameInfo(data);
                    setError(null);
                } else {
                    setError("");
                }
            } catch (err) {
                setError("Error al cargar la información");
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, [appId, actions]);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (!gameInfo) return <div>No se encontró información del juego</div>;

    const hasVideo = gameInfo.movies && gameInfo.movies.length > 0;
    const videoSrc = hasVideo ? gameInfo.movies[0].mp4.max : null;

    return (
        <div
            className={`flip-card ${isFlipped ? "flipped" : ""}`}
            onClick={handleCardClick}
        >
            <div className="flip-card-inner">
                <div
                    className="flip-card-front"
                    style={{
                        backgroundImage: `url(${gameInfo.header_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {videoSrc && (
                        <video
                            className="flip-card-front-video"
                            src={videoSrc}
                            autoPlay
                            muted
                            loop
                        />
                    )}
                </div>
                <div className="flip-card-back">
                    <h2>{gameInfo.name}</h2>
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
                    <p>
                        Fecha de lanzamiento:{" "}
                        {gameInfo.release_date?.date || "N/A"}
                    </p>
                    {gameInfo.metacritic && (
                        <p>
                            Puntuación Metacritic: {gameInfo.metacritic.score}
                        </p>
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
            </div>
        </div>
    );
};

GameCard.propTypes = {
    appId: PropTypes.number.isRequired,
};
