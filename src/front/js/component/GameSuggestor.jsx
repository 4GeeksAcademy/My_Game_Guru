import React from "react";
import "../../styles/Gamesuggestor.css";

export function GameSuggestor() {
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
