import React, { useState, useContext, useEffect, useRef } from "react";
import Typed from "typed.js";
import "../../styles/gamesuggestor.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export function GameSuggestor() {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const typedElement = useRef(null);
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    useEffect(() => {
        store.appidsGame = [];
        const typed = new Typed(typedElement.current, {
            strings: [
                "Videojuegos",
                "<span class='highlightedText'>Sugerencias</span>",
                "<span class='highlightedText2'>Recomendaciones</span>",
                "<span class='highlightedText'>Ideas</span>",
                "Búsquedas",
            ],
            typeSpeed: 100,
            backSpeed: 100,
            loop: true,
            contentType: "html",
        });

        return () => {
            typed.destroy();
        };
    }, []);

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
                                <span ref={typedElement}></span>
                            </h2>
                            <p className="description">
                                ¿No sabes que jugar? ¡Nosotros te ayudamos!
                                <br></br>
                                Escribe que tipo de juego te gustaría jugar y te
                                recomendaremos varios.
                                <br></br>¡Es muy fácil! ¡Inténtalo!
                            </p>
                            <div className="inputContainer">
                                <i className="fa-solid fa-magnifying-glass searchIcon"></i>
                                <input
                                    type="text"
                                    id="gameTypeInput"
                                    className="inputField"
                                    placeholder={
                                        showPlaceholder
                                            ? "Escribe aquí que tipo de juego te gustaría jugar"
                                            : ""
                                    }
                                    onFocus={() => setShowPlaceholder(false)}
                                    onBlur={() => {
                                        if (inputValue === "") {
                                            setShowPlaceholder(true);
                                        }
                                    }}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                    }}
                                    value={inputValue}
                                    onKeyDown={async (e) => {
                                        if (e.key === "Enter") {
                                            if(store.token == null) return alert('Para utilizar esta funcion debes iniciar sesion')
                                            let response = await actions.getSuggestions(inputValue);
                                            if (response) {
                                                setInputValue("");
                                                navigate("/suggestions");
                                            } else {
                                                alert(
                                                    "Lo siento, no hemos podido procesar tu pedido.\nIntentalo nuevamente con otras palabras"
                                                );
                                                setInputValue("");
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
