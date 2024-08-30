import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/dropdown.css";

export const ProfileCard = () => {
    const { store, actions } = useContext(Context);

    const handleLogoutClick = () => {
        actions.logout();
    };

    const username = store.username;

    return (
        <div className="dropdown-menu form">
            <div className="card-prof">
                <main className="user-info">
                    <div className="user">
                        <h1 className="welcome-text">Bienvenido {username}</h1>
                    </div>
                </main>
            </div>
            <input
                        className="submit mt-3"
                        type="submit"
                        value="Cerrar Sesión"
                        onClick={handleLogoutClick}
                    />
        </div>
    );
};
