import React from "react";
import React, { useState } from "react";
import "../../styles/Gamesuggestor.css";

export function GameSuggestor() {

    const [inputValue, setInputValue] = useState("");


    return (
        <section className="card">
            <div className="container">
                <div className="content">
                    <div className="imageWrapper">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/925e67e29126fc2a39f865c09a3e81abb981830d056e2dc31ef0cb3e333c35fa?apiKey=001bde4c6b2a499891ace6677fe08678&&apiKey=001bde4c6b2a499891ace6677fe08678"
                            className="gameImage"
                            alt="Game suggestion visual"
                        />
                    </div>
                    <div className="textWrapper">
                        <div className="textContent">
                            <h2 className="title">
                                ¿No sabes que jugar? <br /> No te vuelvas loco{" "}
                                <br />
                                <span className="highlightedText">
                                    ¡nosotros lo buscamos!
                                </span>
                            </h2>

                            <input
                                type="text"
                                id="gameTypeInput"
                                className="inputField"
                                placeholder="Escribe aquí que tipo de juego te gustaría jugar"
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        actions.getSuggestions(inputValue);
                                    }
                                }}
                            />

                            <div>{ store.appidsGame == null ? "no han llegado los appid todavia" : store.appidsGame.map((itemList, index) => (<h3>{itemList}</h3>)) }</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}