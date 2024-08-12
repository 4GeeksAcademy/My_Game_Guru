import React from "react";
import { useState, useContext } from "react";
import "../../styles/Gamesuggestor.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export function GameSuggestor() {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
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
                                        setInputValue("")
                                        actions.getSuggestions(inputValue);
                                        // navigate("/vista-para-mostrar-las-5-cartas");
                                    }
                                }}
                            />

                            {/* descomentar bloque de codigo debajo para verificar que este llegando los appids de los juegos, luego debe ser borrado */}
                            {/* <div style={{ "color": "white"}}>{ store.appidsGame == null ? 
                                <p>"no han llegado los appid todavia" </p>: 
                                store.appidsGame.map((itemList, index) => (<p key={index}>{itemList}</p>)) }
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
