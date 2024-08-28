import { GameCard } from "../component/GameCard";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import backgroundImage from "../../img/background.jpg";
import { TriangleAlert } from 'lucide-react';
import "../../styles/favorites.css";

export const Favorites = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [gamesData, setGamesData] = useState([]);
    const [isFavorite, setisFavorite] = useState(true);
    const [bgLoaded, setBgLoaded] = useState(false);

    useEffect(() => {
        if (store.token != null) {
            const save_favourites = async () => {
                try {
                    let get_favourites = await fetch(
                        `${process.env.BACKEND_URL}/api/favouritegames`,
                        {
                            method: ["GET"],
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
        }
    }, [store.token, store.appidsGame]);

    useEffect(() => {
        const fetchGamesData = async () => {
            try {
                const gamesPromises = store.favorites.map((appId) =>
                    actions.fetchGameInfo(appId)
                );
                const gamesResults = await Promise.all(gamesPromises);
                setGamesData(gamesResults);
            } catch (err) {
                console.error(`Promise error: ${err}`);
            }
        };

        fetchGamesData();
    }, [store.favorites]);

    useEffect(() => {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => setBgLoaded(true);
    }, []);
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
            {store.favorites.length > 0 ? (
                gamesData ? (
                    gamesData?.map((gameInfo, index) => (
                        <GameCard
                            key={gameInfo["steam_appid"]}
                            appId={gameInfo["steam_appid"]}
                            gameInfo={gameInfo}
                            isFavorite={store.favorites.includes(
                                gameInfo["steam_appid"]
                            )}
                        />
                    ))
                ) : (
                    <p>Cargando Datos...</p>
                )
            ) : (
                <div className="empty-favorites-container">
                    <TriangleAlert className="alert-icon" />
                    <p className="empty-favorites-text">
                        No tienes juegos en favoritos.
                    </p>
                </div>
            )}
        </div>
    );
};
