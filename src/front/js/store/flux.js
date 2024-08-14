const apiUrl = process.env.BACKEND_URL + "/api";
const STEAM_API_URL = process.env.STEAM_API_URL

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			token: null,
			appidsGame:[482730, 1089350, 1100600, 1097130, 1263850],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			getSuggestions:async (userPrompt) => {
				try {
					// let storageToken = localStorage.getItem("token");
					// if (!storageToken) 
					// 	return JSON.stringify({ "msg": "you must have a user for this function"});

					// setStore({ token: storageToken });

					let response = await fetch(apiUrl + "/suggestions", {
						method: "POST",
						headers: {
							// Authorization : "Bearer " + storageToken,
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({ "user_prompt" : userPrompt })
					});

					let data = await response.json();
					let gameListString = data.recommendations[0].message.content;

					const gameList = gameListString.split(" ");
					setStore({ appidsGame: gameList });

					return true
					
				} catch (error) {
					console.error(`Promise error: ${error}`);
				}
				
				
			},

			getGameDetails: async (gameID) => {
				try {
				  let response = await fetch(STEAM_API_URL+gameID, 
            {headers: {
            "Access-Control-Allow-Origin" : "*"
            }});
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
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error al cargar el mensaje desde el backend", error);
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

            // Nueva función para registrar un usuario
                        // Función para registrar un usuario
						signup: async (userData) => {
							try {
								const response = await fetch(apiUrl + "/signup", {
									method: "POST",
									headers: {
										"Content-Type": "application/json"
									},
									body: JSON.stringify(userData)
								});
			
								const data = await response.json();
			
								if (!response.ok) {
									throw new Error(data.msg || "Error en el registro");
								}
			
								// Almacenar el token en el estado global y en localStorage
								setStore({ token: data.token });
								localStorage.setItem("token", data.token);
			
								return true;
							} catch (error) {
								console.log("Error en el registro:", error);
								return { msg: error.message };
							}
						},
			 // Función para iniciar sesión //**	NUEVA SOLICITUD PARA GUARDAR EL TOKEN. */
            login: async (email, password) => {
                try {
                    let response = await fetch(apiUrl + "/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (!response.ok) {
                        setStore({ token: null });
                        return false;
                    }

                    let data = await response.json();
                    setStore({ token: data.token });
                    localStorage.setItem("token", data.token);
                    return true;
                } catch (error) {
                    console.error("Error en la solicitud de login:", error);
                    setStore({ token: null });
                    return false;
                }
            },
        }
    };
};

export default getState;
