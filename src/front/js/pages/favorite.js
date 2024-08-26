import { Favorites } from "../component/Favorites";
import { GameCard } from "../component/GameCard";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Favorite= () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [gamesData, setGamesData] = useState([]);
    const [isFavorite, setisFavorite] = useState(true);
    
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

    return (
        <div className="favorites-page">
            {store.favorites.length > 0 ? (
                gamesData != null ?
                gamesData?.map((gameInfo, index) => (
                    <GameCard
                        key={index}
                        appId={gameInfo['steam_appid']}
                        gameInfo={gameInfo}
                        isFavorite={isFavorite}
                    />
                )) : <p>Cargando Datos...</p>
            ) : (
                <p>No tienes juegos en favoritos.</p>
            )}
        </div>
    );
};