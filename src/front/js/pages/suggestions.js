import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GameCard } from "../component/GameCard";
import { Context } from "../store/appContext";

export const Suggestions = () => {
  const { store, actions } = useContext(Context);
  // const suggestedGameIds = store.appidsGame;

  return (
    <div className="suggestions-page">
      <h1>Sugerencias de Juegos</h1>
      {store.appidsGame.map(id => (
        <GameCard key={id} appId={id} />
      ))}
    </div>
  );
};

