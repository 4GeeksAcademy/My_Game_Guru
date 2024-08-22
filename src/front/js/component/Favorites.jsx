import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { GameCard } from "../component/GameCard";

export const Favorites = () => {
    const { store } = useContext(Context);

    return (
        <div className="favorites-page">
            {store.favorites.length > 0 ? (
                store.favorites.map((game) => (
                    <GameCard key={game.appId} appId={game.appId} />
                ))
            ) : (
                <p>No tienes juegos en favoritos.</p>
            )}
        </div>
    );
};