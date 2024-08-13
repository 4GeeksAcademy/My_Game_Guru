import React, { useState, useEffect, useContext } from "react";
import PropTypes, { elementType } from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const GameCard = ({ appId }) => {
  const [gameInfo, setGameInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.BACKEND_URL + "/api";

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const response = await fetch(`${apiUrl}/game/${appId}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar la información');
        }

        const data = await response.json();

        if (data[appId] && data[appId].success) {
          setGameInfo(data[appId].data);
        } else {
          setError('No se encontró el juego');
        }
        setLoading(false);
      } catch (err) {
        setError('Error al cargar la información');
        setLoading(false);
      }
    };
    fetchGameInfo();
  
  }, [appId]);
  console.log('hola',gameInfo);
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!gameInfo) return <div>No se encontró información del juego</div>;
  
  return (
    <div className="game-card">
      <h2>{gameInfo.name}</h2>
      <img src={gameInfo.header_image} alt={gameInfo.name} />
      <p>{gameInfo.short_description}</p>
      <p>Desarrollador: {gameInfo.developers.join(', ')}</p>
      <p>Publicado por: {gameInfo.publishers.join(', ')}</p>
      <p>Fecha de lanzamiento: {gameInfo.release_date.date}</p>
      {gameInfo.metacritic && (
        <p>Puntuación Metacritic: {gameInfo.metacritic.score}</p>
      )}
      <p>Géneros: {gameInfo.genres.map(genre => genre.description).join(', ')}</p>
    </div>
  );
};