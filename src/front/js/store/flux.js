const apiUrl = process.env.BACKEND_URL + "/api";
const STEAM_API_URL = process.env.STEAM_API_URL;
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            username: "",
            token: null,
            appidsGame: [],
            message: null,
            demo: [],
            registrationSuccess: false, // Estado añadido para el éxito del registro
            gameInfo: {},
            gameError: null, // Nuevo estado para manejar errores.
            favorites: [],
        },
        actions: {
            




            addFavorite: (appId) => {
                const store = getStore();
                const favorite = store.favorites 
                const existing_id = favorite.includes(appId); 
                // Añadir el juego a la lista de favoritos
                const updatedFavorites = [...store.favorites, game];
                setStore({ favorites: updatedFavorites });
            },

            removeFavorite: (appId) => {
                const store = getStore();
                // Eliminar el juego de la lista de favoritos
                const updatedFavorites = store.favorites.filter(
                    (game) => game.appId !== appId
                );
                setStore({ favorites: updatedFavorites });
            },

            loadSession: async () => {
                let storageToken = localStorage.getItem("token");
                if (!storageToken) return;
                setStore({ token: storageToken });
                let resp = await fetch(apiUrl + "/login", {
                    headers: {
                        Authorization: "Bearer " + storageToken,
                    },
                });
                if (!resp.ok) {
                    setStore({ token: null });
                    localStorage.removeItem("token");
                    return false;
                }
                let data = await resp.json();
                setStore({ userInfo: data });
                return true;
            },
            // Use getActions to call a function within a function
            getSuggestions: async (userPrompt) => {
                try {
                    // let storageToken = localStorage.getItem("token");
                    // if (!storageToken)
                    //  return JSON.stringify({ "msg": "you must have a user for this function"});
                    // setStore({ token: storageToken });
                    let response = await fetch(apiUrl + "/suggestions", {
                        method: "POST",
                        headers: {
                            // Authorization : "Bearer " + storageToken,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ user_prompt: userPrompt }),
                    });
                    let data = await response.json();
                    // let gameListString =
                    //     data.recommendations[0].message.content;
                    // const gameList = gameListString.split(" ");
                    // const gameList = gameListString.split(' ').filter(el=> el.includes('\n')).map(el=> el.slice(0, -3))
                    const gameList = data
                    setStore({ appidsGame: gameList });
                    return true;
                } catch (error) {
                    console.error(`Promise error: ${error}`);
                }
            },
            getSuggestions: async (userPrompt) => {
                try {
                    let response = await fetch(apiUrl + "/suggestions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ user_prompt: userPrompt }),
                    });
            
                    if (!response.ok) {
                        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
                    }
            
                    let data = await response.json();
            
                    // Verifica que data es lo que esperas antes de usarlo
                    if (!Array.isArray(data)) {
                        throw new Error("La respuesta no tiene el formato esperado");
                    }
            
                    setStore({ appidsGame: data });
                    // return true;
                } catch (error) {
                    // console.error(`Promise error: ${error.message}`);
                    return false; // También puedes devolver un objeto con más detalles del error si lo necesitas
                }
            },


            getGameDetails: async (gameID) => {
                try {
                    let response = await fetch(STEAM_API_URL + gameID, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        },
                    });
                    if (!response.ok) {
                        console.error(`Error Request: ${response.status}`);
                        return;
                    }
                    let data = await response.json();
                    return data;
                } catch (error) {
                    console.error(`Promise error: ${error}`);
                }
            },
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            // Función para obtener un mensaje del backend
            getMessage: async () => {
                try {
                    // Realiza una solicitud al backend para obtener un mensaje
                    const resp = await fetch(
                        process.env.BACKEND_URL + "/api/hello"
                    );
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log(
                        "Error al cargar el mensaje desde el backend",
                        error
                    );
                }
            },
            // Función para cambiar el color de los elementos demo
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            // Función para registrar un usuario
            signup: async (userData) => {
                try {
                    const response = await fetch(apiUrl + "/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.msg || "Error en el registro");
                    }
                    // Almacenar el token en el estado global y en localStorage
                    setStore({ 
                        token: data.access_token, 
                        registrationSuccess: true  // Indicar que el registro fue exitoso
                    });
                    localStorage.setItem("token", data.access_token);
                    return true;
                } catch (error) {
                    console.log("Error en el registro:", error);
                    return { msg: error.message };
                }
            },
            
            // Función para iniciar sesión
            setRegistrationSuccess: (value) => {
                setStore({ registrationSuccess: value });
            },
            
            login: async (email, password) => {
                try {
                    let response = await fetch(apiUrl + "/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    });
                    if (!response.ok) {
                        setStore({ token: null, username: null });
                        return false;
                    }
                    let data = await response.json();

                    // Ajusta para usar el campo "access_token"
                    if (data.access_token) {
                        setStore({
                            token: data.access_token,
                            username: data.username,
                        });
                        localStorage.setItem("token", data.access_token);
                    }

                    return true;
                } catch (error) {
                    setStore({ token: null, username: null });
                    return false;
                }
            },
            // OBTENER INFORMACION DEL USUARIO PARA MOSTRAR EN EL PROFILE CARD
            // getProfile: async () => {
            //     try {
            //         const response = await fetch(process.env.BACKEND_URL + "/api/profile", {
            //             method: "GET",
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 Authorization: `Bearer ${store.token}` // Incluye el token en los headers
            //             }
            //         });
            //         if (response.ok) {
            //             const data = await response.json();
            //             setStore({ username: data.username });
            //         } else {
            //             console.error("Error obteniendo el perfil");
            //         }
            //     } catch (error) {
            //         console.error("Hubo un error en la solicitud", error);
            //     }
            // },
            fetchGameInfo: async (appId) => {
                try {
                    const apiUrl = process.env.BACKEND_URL + "/api";
                    const response = await fetch(`${apiUrl}/game/${appId}`);
                    if (!response.ok) {
                        throw new Error("Error al cargar la información");
                    }
                    const data = await response.json();
                    if (data[appId] && data[appId].success) {
                        return data[appId].data;
                    } else {
                        return null;
                    }
                } catch (err) {
                    console.error("Fetch error:", err);
                    return null;
                }
            },

            logout: async () => {
                const store = getStore();
                const token = store.token;

                if (token) {
                    try {
                        const response = await fetch(
                            process.env.BACKEND_URL + "/api/logout",
                            {
                                method: "POST",
                                headers: {
                                    "Access-Control-Allow-Origin": "*", 
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if (response.ok) {
                            // Limpiar token del store y del localStorage
                            setStore({ token: null, username: null });
                            localStorage.removeItem("token");
                            alert("¡Cierre de sesión exitoso!");
                            // Redirigir al usuario a la página de inicio de sesión
                            window.location.href = "/"; // Ajusta la ruta según sea necesario
                        } else {
                            console.error(
                                "Error al cerrar sesión: ",
                                response.statusText
                            );
                            alert(
                                "Error al cerrar sesión. Inténtalo de nuevo."
                            );
                        }
                    } catch (error) {
                        console.error("Error al cerrar sesión:", error);
                        alert("Hubo un problema al cerrar sesión.");
                    }
                } else {
                    alert("No hay token disponible.");
                }
            },
        },
    };
};
export default getState;
