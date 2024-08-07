import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { GameSuggestor } from "../component/GameSuggestor";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return <GameSuggestor />;
};
