import React, { useContext } from "react";
import { GameCard } from "../component/GameCard";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import backgroundImage from "../../img/background.jpg";

export const Suggestions = () => {
    const { store } = useContext(Context);

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
            {store.appidsGame.map((element) => (
                <GameCard
                    key={element["app_id"]}
                    appId={Number(element["app_id"])}
                />
            ))}
        </div>
    );
};
