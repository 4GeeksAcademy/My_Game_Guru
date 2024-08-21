import React, { useContext } from "react";
import { GameCard } from "../component/GameCard";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Suggestions = () => {
    const { store } = useContext(Context);

    return (
        <div className="suggestions-page">
            {store.appidsGame.map((id) => {
                const numericId = Number(id);
                return <GameCard key={numericId} appId={numericId} />;
            })}
        </div>
    );
};
