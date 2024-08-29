
import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/dropdown.css";
import "../../styles/profilecard.css";

export const ProfileCard = () => {
    const { store, actions } = useContext(Context);

    const handleLogoutClick = () => {
        actions.logout();
    };
    
    const username = store.username;

    return (
        <div className="dropdown-menu form">
            <div className="card-prof">
                <div className="profile-pic-container">
                    <input accept="image/png, image/jpeg" name="avatar" type="file" className="profile-pic-input" />
                    <a href="#" className="profile-pic">
                        <svg
                            xmlSpace="preserve"
                            style={{ enableBackground: 'new 0 0 129.5 129.5' }}
                            viewBox="0 0 129.5 129.5"
                            xmlns="http://www.w3.org/2000/svg"
                            id="Camada_1"
                            version="1.1"
                        >
                            <style type="text/css">
                                {`
                                .st0 {
                                    fill: #bac5e1;
                                }
                                .st1 {
                                    fill: #ffffff;
                                }
                                `}
                            </style>
                            <g>
                                <ellipse
                                    ry="64.8"
                                    rx="64.8"
                                    cy="64.8"
                                    cx="64.8"
                                    className="st0"
                                    transform="matrix(0.7071 -0.7071 0.7071 0.7071 -26.8258 64.7633)"
                                />
                                <ellipse ry="32.6" rx="25.2" cy="54.2" cx="64.8" className="st1" />
                                {/* Resto del SVG */}
                            </g>
                        </svg>
                    </a>
                </div>
                <main className="user-info">
                    <div className="user">
                        <h1>Hola {username}</h1> 
                        <p>Bienvenido</p>
                    </div>
                </main>
            </div>
            <ul className="profile-options">
                <li>
                    <a href="#">Mi Perfil</a>
                </li>
                <li>
                    <a href="/favorites">Favoritos</a>
                </li>
                <li>
                    <button onClick={handleLogoutClick}>Cerrar Sesión</button>
                </li>
            </ul>
        </div>
    );
};

