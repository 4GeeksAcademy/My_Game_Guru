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
        const save_favourites = async () => {
            try {
                const get_favourites = await fetch(
                    `${process.env.BACKEND_URL}/api/favouritegames`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            Authorization: `Bearer ${store.token}`,
                        },
                    }
                );
                const response = await get_favourites.json();
                store.favorites = response["result"];
                console.log(store.favorites);
            } catch (error) {
                console.error({ msg: "ERROR AL OBTENER FAVORITOS", error });
            }
        };

        save_favourites();
    }, []);

    useEffect(() => {
        const fetchGamesData = async () => {
            setLoading(true);

            try {
                const gamesPromises = gameList.map((appId) =>
                    actions.fetchGameInfo(appId["app_id"])
                );
                const gamesResults = await Promise.all(gamesPromises);

                const validGames = gamesResults.filter((game) => game !== null);
                setGamesData(validGames);
            } catch (err) {
                setError("Error al cargar las sugerencias.");
            } finally {
                setLoading(false);
            }
        };

        fetchGamesData();
    }, [gameList]);

    useEffect(() => {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => setBgLoaded(true);
    }, []);

    const pageStyle = {
        backgroundImage: bgLoaded ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        // flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    if (loading) {
        return (
            <div className="suggestions-page" style={pageStyle}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="suggestions-page" style={pageStyle}>
                {error}
            </div>
        );
    }

    if (gamesData.length === 0) {
        return (
            <div className="suggestions-page" style={pageStyle}>
                <Loader />
            </div>
        );
    }

    return (
        <div className="suggestions-page" style={pageStyle}>
            {gamesData.map((gameInfo, index) => {
                if (!gameInfo || !gameInfo.steam_appid) {
                    console.warn(
                        `Datos no válidos para el juego en la posición ${index}`
                    );
                    return null;
                }

                const toggleFavorite = () => {
                    // if (isFavorite) {
                    //     actions.removeFavorite(gameList[index]["app_id"]);
                    // } else {
                    //     actions.addFavorite(gameList[index]["app_id"]);
                    // }
                };

                return (
                    <GameCard
                        key={index}
                        appId={gameInfo["steam_appid"]}
                        gameInfo={gameInfo}
                        isFavorite={store.favorites.includes(
                            gameInfo["steam_appid"]
                        )}
                        toggleFavorite={toggleFavorite}
                    />
                );
            })}
        </div>
    );
};
