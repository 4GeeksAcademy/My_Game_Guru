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

    const gameList = Array.isArray(store.appidsGame) ? store.appidsGame : [];

    useEffect(() => {
        const fetchGamesData = async () => {
            setLoading(true); // Asegurarse de que el estado de carga se establece en true al iniciar la solicitud

            try {
                const gamesPromises = gameList.map((appId) =>
                    actions.fetchGameInfo(appId["app_id"])
                );
                const gamesResults = await Promise.all(gamesPromises);
                setGamesData(gamesResults);
            } catch (err) {
                setError("Error al cargar las sugerencias.");
            } finally {
                setLoading(false); // Asegurarse de que el estado de carga se establece en false después de completar la solicitud
            }
        };

        fetchGamesData();
    }, [gameList, actions]);

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
                backgroundImage: `url(${backgroundImage})`,
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
