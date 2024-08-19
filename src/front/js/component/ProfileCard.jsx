
import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import "../../styles/Dropdown.css";
import "../../styles/Profilecard.css";

export const ProfileCard = () => {
    const { store, actions } = useContext(Context);

    const handleLogoutClick = () => {
        actions.logout();
    };
    // useEffect(() => {
    //     // Cargar la sesión al montar el componente
    //     actions.loadSession();
    // }, []);

    // if (!store.token) {
    //     return <div>Inicia sesión para ver tu perfil</div>;
    // }

//     useEffect(() => {
//       actions.getUsername(); // Obtener el nombre de usuario cuando el componente se monta
//   }, []);


    return (
        <div className="dropdown-menu form">
            <div className="card-prof">
                <input accept="image/png, image/jpeg" name="avatar" type="file" />
                <main>
                    <a href="#">
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
                                <path
                                    d="M64.8,89.1c-21.1,0-39.6,6.4-50.5,16.2c11.9,14.7,30.1,24.2,50.5,24.2c20.4,0,38.6-9.4,50.5-24.2 C104.4,95.6,85.8,89.1,64.8,89.1z"
                                    className="st1"
                                />
                                <path
                                    d="M67.6,105.9H62c-5.3,0-9.6-4.3-9.6-9.6V74.4c0-5.3,4.3-9.6,9.6-9.6h5.6c5.3,0,9.6,4.3,9.6,9.6v21.9 C77.2,101.6,72.9,105.9,67.6,105.9z"
                                    className="st1"
                                />
                                <path
                                    d="M43,55.7c1.5,4.2,0.9,8.3-1.3,9s-5.1-2.1-6.6-6.3c-1.5-4.2-0.9-8.3,1.3-9C38.6,48.6,41.6,51.4,43,55.7z"
                                    className="st1"
                                />
                                <ellipse
                                    ry="4.2"
                                    rx="8.1"
                                    cy="57"
                                    cx="90.4"
                                    className="st1"
                                    transform="matrix(0.328 -0.9447 0.9447 0.328 6.8843 123.7582)"
                                />
                                <path
                                    d="M42.7,55.5c-3.3-6-6.6-12.3-6.5-19.1c0.2-6.8,5.3-14,12.1-13.7c1.2,0,2.4,0.3,3.5,0.1c2.3-0.3,4.1-2.3,6-3.7 c4.3-3.2,10.3-3.9,15.2-1.9c3.1,1.2,5.7,3.4,8.6,4.8c5.6,2.6,12.4,2.4,17.8-0.7c-1.1,2.1-3,3.8-5.2,4.6c2,0.6,4.3,0.6,6.3-0.2 c-1.2,2.2-3.2,3.9-5.5,4.8c1.7,0.1,3.4,0.2,5.2,0.4c-1.5,2.1-3.6,3.7-6,4.6c1.4,0,2.7,0.1,4.1,0.1c-1,3-3.6,5.4-6.7,6.1 c0.9,0,1.7,0,2.6,0c-2.9,4.1-5.7,8.2-8.6,12.4c-0.8,1.2-1.7,2.4-2.9,3.2c-1,0.6-2.2,0.9-3.3,1.2c-8.5,1.9-17.2,2.5-25.8,1.7 c-3-0.3-6-0.8-8.4-2.6c-2.3-1.8-3.6-5.4-2-7.8"
                                    className="st1"
                                />
                                <path
                                    d="M48.5,95.3c0.2-3.4,0.6-6.8,1.3-10.2c1.7,1.9,4.6,2.2,7.1,2.3c3.9,0.2,7.8,0.3,11.6,0.5 c0.5,2.6,0.8,5.8-1.1,7.6c-0.9,0.9-2.1,1.3-3.3,1.6c-2.6,0.7-5.3,1.1-8,1.1c-3.2,0-7.1-0.9-8.1-4c0.2,0.6-1.4,4.1-1.8,5.2 c-0.4,1.2-0.9,2.5-0.7,3.7c0.6,2.8,3.4,4.5,6.1,5.3c8.1,2.6,17.1,2.1,25.3-1.2c3.2-1.4,6.4-3.2,8.4-6.1c2-2.9,2.6-6.7,1.4-10.1 c0.5,0.1,1-0.3,1.4-0.8c1.2-1.4,1.5-3.4,1.7-5.3c0.4-4.5,0.9-9-0.3-13.4c-1.2-4.4-4.4-8.6-8.9-8.9c-4.2-0.3-8.3,2.7-9.7,6.6 c-0.9,2.6-0.8,5.5-1.5,8.2c-0.4,1.3-1.3,2.7-2.7,2.7c-1.2,0-2-1.1-2.7-2.1c-4.1-6-8.2-12.1-12.3-18.1c-1.3-1.9-2.9-3.9-5.1-4.4 c-3-0.7-5.7,1.7-8.1,3.9c-5.8,5.4-10.8,12.1-14.3,19.3c-3.5,7.2-5.4,15.4-5.7,23.6c0,0.6,0,1.4,0.5,1.7c0.4,0.3,0.9,0.2,1.4,0.2 c3.1-0.4,6.1-0.8,9.2-1.2C46.1,102.5,47.9,99.4,48.5,95.3z"
                                    className="st1"
                                />
                            </g>
                        </svg>
                    </a>
                    <div className="user">
                        <h1>Hi Brenda</h1>
                        <p>Welcome Back</p>
                    </div>
                </main>
            </div>
            <ul>
                <li>
                    <a href="#">My Profile</a>
                </li>
                <li>
                    <a href="#">Settings</a>
                </li>
                <li>
                    <button onClick={handleLogoutClick}>Cerrar Sesión</button>
                </li>
            </ul>
        </div>
    );
};
