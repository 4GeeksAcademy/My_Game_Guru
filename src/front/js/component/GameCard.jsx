import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/gamecard.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const GameCard = ({ gameInfo, isFavorite, toggleFavorite, appId }) => {
    const { actions, store } = useContext(Context);
    const [isFlipped, setIsFlipped] = useState(false);
    // const [switchFavorite, setSwitchFavorite] = useState(isFavorite);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const handleFavoriteClick = async (e) => {
        setDeleting(true);
        // setSwitchFavorite(!switchFavorite);
        if (isFavorite == false) {
            await actions.addFavorite(appId);
            console.log(`agrega este ID ${appId}`);
        }
        if (isFavorite == true) {
            await actions.removeFavorite(appId);
            console.log(`elimina este ID ${appId}`);
        }
        setDeleting(false);
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
                    {deleting ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <i
                            className={`fa-regular fa-star favorite-icon ${
                                isFavorite ? "fa-solid" : ""
                            }`}
                            onClick={(e) => {
                                // setSwitchFavorite(!switchFavorite);
                                e.stopPropagation();
                                handleFavoriteClick(e);
                            }}
                        />
                    )}
                </div>
                <div className="flip-card-back">
                    <h2>{gameInfo?.name || "Nombre no disponible"}</h2>
                    <p>
                        {gameInfo?.short_description ||
                            "Descripción no disponible"}
                    </p>
                    {/* {gameInfo?.metacritic?.score && (
                        <p>
                            Puntuación Metacritic: {gameInfo.metacritic.score}
                        </p>
                    )}
                    <p>
                        Géneros:{" "}
                        {gameInfo?.genres
                            ?.map((genre) => genre.description)
                            .join(", ") || "Información no disponible"}
                    </p> */}
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
    toggleFavorite: PropTypes.func,
    appId: PropTypes.number,
};
