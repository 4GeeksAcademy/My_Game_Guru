// import React, { useContext } from "react";
// import { GameCard } from "../component/GameCard";
// import { Context } from "../store/appContext";
// import "../../styles/index.css";

// export const Suggestions = () => {
//     const { store } = useContext(Context);

//     return (
//         <div className="suggestions-page">
//             {store.appidsGame.map((element) => (
//                 <GameCard
//                     key={element["app_id"]}
//                     appId={Number(element["app_id"])}
//                 />
//             ))}
//         </div>
//     );
// };
import React, { useContext } from "react";
import { GameCard } from "../component/GameCard";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Suggestions = () => {
    const { store } = useContext(Context);

    // Verificar si appidsGame es un array
    const gameList = Array.isArray(store.appidsGame) ? store.appidsGame : [];

    return (
        <div className="suggestions-page">
            {gameList.length > 0 ? (
                gameList.map((element) => (
                    <GameCard
                        key={element["app_id"]}
                        appId={Number(element["app_id"])}
                    />
                ))
            ) : (
                <div>No hay sugerencias disponibles.</div>
            )}
        </div>
    );
};
