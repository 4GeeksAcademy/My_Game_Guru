import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GameCard } from "../component/GameCard";
import { Context } from "../store/appContext";

export const Suggestions = () => {
  const { store, actions } = useContext(Context);
  const [gameInfo, setGameInfo] = useState([]);

//   useEffect(() => {
//     if (store.appidsGame) {
//       let gameDetails = async () => {
// 		const detailsPromises = store.appidsGame.map((appId) => actions.getGameDetails(appId))
// 		const details = await Promise.all(detailsPromises);
// 		setGameInfo(details)
//       };
//     }
//   }, [store.appidsGame, actions]);

useEffect(() => {
    if (store.appidsGame) {
        const fetchGameDetails = async () => {
            const detailsPromises = store.appidsGame.map((appId) => actions.getGameDetails(appId));
            const details = await Promise.all(detailsPromises);
			      console.log("Detalles de los juegos:", details);
            setGameInfo(details);
            actions.updateSuggestedGames(details);  // Actualiza el store con los detalles obtenidos
        };

        fetchGameDetails(); // Llama a la función asíncrona
    }
}, [store.appidsGame]);

  

  return (
    <div className="container">
      <div>
        {!store.appidsGame || store.appidsGame.length === 0 ? (
          <h1 style={{ "color": "white" }}>
            No se han obtenido sugerencias todavia
          </h1>
        ) : (
          store.appidsGame.map((gameID, index) => <p key={index}>{gameID}</p>)
        )}
      </div>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
