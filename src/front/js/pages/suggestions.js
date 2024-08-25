import React, { useContext, useEffect, useState } from "react";
import { GameCard } from "../component/GameCard";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import backgroundImage from "../../img/background.jpg";
import { Loader } from "../component/Loader";

export const Suggestions = () => {
    const { actions, store } = useContext(Context);
    const [gamesData, setGamesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bgLoaded, setBgLoaded] = useState(false);

    const gameList = Array.isArray(store.appidsGame) ? store.appidsGame : [];

    useEffect(() => {
        const fetchGamesData = async () => {
            setLoading(true);

            try {
                const gamesPromises = gameList.map((appId) =>
                    actions.fetchGameInfo(appId["app_id"])
                );
                const gamesResults = await Promise.all(gamesPromises);
                setGamesData(gamesResults);
            } catch (err) {
                setError("Error al cargar las sugerencias.");
            } finally {
                setLoading(false);
            }
        };

        fetchGamesData();
    }, [gameList, actions]);

    useEffect(() => {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => setBgLoaded(true);
    }, []);

    if (loading) {
        return (
            <div className="suggestions-page">
                <Loader />
            </div>
        );
    }

    if (error) {
        return <div className="suggestions-page">{error}</div>;
    }

    if (gamesData.length === 0) {
        return (
            <div className="suggestions-page">
                <Loader />
            </div>
        );
    }

    return (
        <div
            className="suggestions-page"
            style={{
                backgroundImage: bgLoaded ? `url(${backgroundImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {gamesData.map((gameInfo, index) => {
                const isFavorite = store.favorites.some(
                    (fav) => fav.app_id === gameList[index]["app_id"]
                );

                const toggleFavorite = () => {
                    if (isFavorite) {
                        actions.removeFavorite(gameList[index]["app_id"]);
                    } else {
                        actions.addFavorite(gameList[index]["app_id"]);
                    }
                };

                return (
                    <GameCard
                        key={index}
                        gameInfo={gameInfo}
                        isFavorite={isFavorite}
                        toggleFavorite={toggleFavorite}
                    />
                );
            })}
        </div>
    );
};
