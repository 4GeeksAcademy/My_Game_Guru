import React, { useContext } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según la ubicación del archivo
import "../../styles/index.css"; // Asegúrate de importar el archivo CSS

export const ThemeSwitcher = () => {
    const { store, actions } = useContext(Context);

    return (
        <div
            className="theme-toggle-div"
            onClick={actions.toggleTheme}
            role="button"
            aria-label="Toggle theme"
        >
            <i
                className={
                    store.theme === "dark"
                        ? "fa-solid fa-sun-bright"
                        : "fa-regular fa-moon"
                }
            ></i>
        </div>
    );
};
