import React, { useState,useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/gamecard.css";
import { Context } from "../store/appContext";



export const GameCard = ({ gameInfo, isFavorite, toggleFavorite }) => {
    const { actions, store } = useContext(Context);
    const [isFlipped, setIsFlipped] = useState(false);
    const [switchFavorite, setSwitchFavorite] = useState(isFavorite);

    const handleFavoriteClick = () => {

        setSwitchFavorite(!switchFavorite);
            if (!switchFavorite) {
                // actions.addfavorite ()
            } 
        
        toggleFavorite();
    };

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const hasVideo = gameInfo?.movies?.length > 0;
    const videoSrc = hasVideo ? gameInfo.movies[0]?.mp4?.max : null;

    return (
        <div
            className={`flip-card ${isFlipped ? "flipped" : ""}`}
            onClick={handleCardClick}
        >
            <div className="flip-card-inner">
                <div
                    className="flip-card-front"
                    style={{
                        backgroundImage: `url(${gameInfo?.header_image || ""})`,
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
                    <i
                        className={`fa-regular fa-star favorite-icon ${
                            switchFavorite ? "fa-solid" : ""
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleFavoriteClick();
                        }}
                    />
                </div>
                <div className="flip-card-back">
                    <h2>{gameInfo?.name || "Nombre no disponible"}</h2>
                    <p>
                        {gameInfo?.short_description ||
                            "Descripción no disponible"}
                    </p>
                    <p>
                        Desarrollador:{" "}
                        {gameInfo?.developers?.join(", ") ||
                            "Información no disponible"}
                    </p>
                    <p>
                        Publicado por:{" "}
                        {gameInfo?.publishers?.join(", ") ||
                            "Información no disponible"}
                    </p>
                    <p>
                        Fecha de lanzamiento:{" "}
                        {gameInfo?.release_date?.date || "N/A"}
                    </p>
                    {gameInfo?.metacritic?.score && (
                        <p>
                            Puntuación Metacritic: {gameInfo.metacritic.score}
                        </p>
                    )}
                    <p>
                        Géneros:{" "}
                        {gameInfo?.genres
                            ?.map((genre) => genre.description)
                            .join(", ") || "Información no disponible"}
                    </p>
                </div>
            </div>
        </div>
    );
};

GameCard.propTypes = {
    gameInfo: PropTypes.shape({
        header_image: PropTypes.string,
        name: PropTypes.string,
        short_description: PropTypes.string,
    }).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
};
