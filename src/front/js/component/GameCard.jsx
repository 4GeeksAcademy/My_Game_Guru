import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/gamecard.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const GameCard = ({ gameInfo, isFavorite, toggleFavorite }) => {
    const { actions, store } = useContext(Context);
    const [isFlipped, setIsFlipped] = useState(false);
    const [switchFavorite, setSwitchFavorite] = useState(isFavorite);
    const navigate = useNavigate();

    const handleFavoriteClick = () => {
        setSwitchFavorite(!switchFavorite);
        if (!switchFavorite) {
            // actions.addfavorite()
        }
        toggleFavorite();
    };

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleLearnMoreClick = (e) => {
        e.stopPropagation();
        navigate(`/single/${gameInfo.steam_appid}`);
    };

    const handleBuyClick = (e) => {
        e.stopPropagation();
        const steamUrl = `https://store.steampowered.com/app/${gameInfo.steam_appid}`;
        window.open(steamUrl, "_blank");
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
                    <div className="button-container">
                        <button
                            className="submit-back-card"
                            onClick={handleLearnMoreClick}
                        >
                            Detalles
                        </button>
                        <button
                            className="submit-back-card btn-buy"
                            onClick={handleBuyClick}
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

GameCard.propTypes = {
    gameInfo: PropTypes.shape({
        header_image: PropTypes.string,
        name: PropTypes.string.isRequired,
        short_description: PropTypes.string,
        steam_appid: PropTypes.number.isRequired,
    }).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
};
