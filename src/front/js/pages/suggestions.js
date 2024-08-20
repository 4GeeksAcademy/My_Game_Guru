import React, { useContext } from "react";
import { GameCard } from "../component/GameCard";
import { Context } from "../store/appContext";
import "../../styles/index.css"; // Asegúrate de que el archivo CSS esté importado

export const Suggestions = () => {
    const { store } = useContext(Context);

    return (
        <div className="suggestions-page">
            {" "}
            {store.appidsGame.map((id) => (
                <GameCard key={id} appId={id} />
            ))}
        </div>
    );
};
