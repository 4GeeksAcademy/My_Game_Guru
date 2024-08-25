import React, { useContext } from 'react';
import { Context } from '../store/appContext'; // Ajusta la ruta según la ubicación del archivo
import '../../styles/index.css'; // Asegúrate de importar el archivo CSS

export const ThemeSwitcher = () => {
    const { store, actions } = useContext(Context);

    return (
        <button 
            className="theme-toggle-btn"
            onClick={actions.toggleTheme}
        >
            <i className={store.theme === 'dark' ? 'fa-solid fa-sun-bright' : 'fa-regular fa-moon'}></i>
        </button>
    );
};
