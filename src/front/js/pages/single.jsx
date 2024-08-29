import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";
import { Loader } from "../component/Loader";

export const Single = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            setLoading(true);
            const data = await actions.fetchGameInfo(theid);
            if (data) {
                setGameDetails(data);
            } else {
                setError("Error al cargar la información del juego.");
            }
            setLoading(false);
        };

        fetchGameDetails();
    }, [theid]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0.5;
        }
    }, [movies]);

    const openFullscreen = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const closeFullscreen = () => {
        setSelectedImage(null);
    };

    if (loading)
        return (
            <div className="suggestions-page">
                <Loader />
            </div>
        );
    if (error) return <div>{error}</div>;
    if (!gameDetails)
        return <div>No se encontró la información del juego.</div>;

    const {
        header_image,
        name,
        short_description,
        detailed_description,
        metacritic,
        genres,
        background,
        screenshots,
        movies,
        developers,
        publishers,
        release_date,
        platforms,
    } = gameDetails;

    return (
        <div className="single-game-page">
            <div
                className="single-game-header"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="header-content">
                    <h1>{name}</h1>
                    <p>{short_description}</p>
                </div>
            </div>
            <div className="single-game-content">
                <div className="game-details">
                    <img
                        src={header_image}
                        alt={name}
                        className="header-image"
                    />
                    <div className="game-info">
                        <div className="game-meta">
                            {metacritic && metacritic.score && (
                                <span className="meta-item metacritic-score">
                                    Metacritic: {metacritic.score}
                                </span>
                            )}
                            <span className="meta-item">
                                <i className="fas fa-calendar"></i>{" "}
                                {release_date.date}
                            </span>
                            <span className="meta-item">
                                <i className="fas fa-code-branch"></i>{" "}
                                {developers.join(", ")}
                            </span>
                            <span className="meta-item">
                                <i className="fas fa-building"></i>{" "}
                                {publishers.join(", ")}
                            </span>
                        </div>
                        <div className="game-genres-section">
                            <h4>Géneros</h4>
                            <div className="game-genres">
                                {genres?.map((genre, index) => (
                                    <span key={index} className="genre-tag">
                                        {genre.description}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="platforms-section">
                            <h4>Sistemas Operativos</h4>
                            <div className="plataforms">
                                {platforms.windows && (
                                    <i className="fab fa-windows"></i>
                                )}
                                {platforms.mac && (
                                    <i className="fab fa-apple"></i>
                                )}
                                {platforms.linux && (
                                    <i className="fab fa-linux"></i>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="game-media">
                    {movies && movies.length > 0 && (
                        <div className="game-movies">
                            <h3>Videos</h3>
                            <video
                                src={movies[0].mp4.max}
                                controls
                                autoPlay
                                loop
                                className="game-video"
                                ref={videoRef}
                            />
                        </div>
                    )}
                    {screenshots && screenshots.length > 0 && (
                        <div className="game-screenshots">
                            <h3>Screenshots</h3>
                            <div className="screenshots-container">
                                {screenshots
                                    .slice(
                                        currentScreenshotIndex,
                                        currentScreenshotIndex + 10
                                    )
                                    .map((shot, index) => (
                                        <img
                                            key={index}
                                            src={shot.path_full}
                                            alt={`Screenshot ${index + 1}`}
                                            onClick={() =>
                                                openFullscreen(shot.path_full)
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="about-game">
                    <h3>About This Game</h3>
                    <div
                        className="about-content"
                        dangerouslySetInnerHTML={{
                            __html: detailed_description,
                        }}
                    />
                </div>
            </div>
            {selectedImage && (
                <div className="fullscreen-image" onClick={closeFullscreen}>
                    <img src={selectedImage} alt="Fullscreen" />
                    <span className="close-button">&times;</span>
                </div>
            )}
        </div>
    );
};
