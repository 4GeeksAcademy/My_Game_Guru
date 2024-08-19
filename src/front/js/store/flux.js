const apiUrl = process.env.BACKEND_URL + "/api";
const STEAM_API_URL = process.env.STEAM_API_URL;

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      appidsGame: [482730, 1089350, 1100600, 1097130, 1263850],
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      getSuggestions: async (userPrompt) => {
        try {
          // let localStorage = localStorage.getItem("token");
          // if (!localStorage)
          // 	return JSON.stringify({ "msg": "you must have a user for this function"});

          // setStore({ token: localStorage });

          let response = await fetch(apiUrl + "/suggestions", {
            method: "POST",
            headers: {
              // Authorization : "Bearer " + localStorage,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_prompt: userPrompt }),
          });

          let data = await response.json();
          let gameListString = data.recommendations[0].message.content;

          const gameList = gameListString.split(" ");
          setStore({ appidsGame: gameList });

          return true;
        } catch (error) {
          console.error(`Promise error: ${error}`);
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
            // Hacer la solicitud POST al endpoint /signup
            const response = await fetch(apiUrl + "/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            // Convertir la respuesta en formato JSON
            const data = await response.json();
    
            // Verificar si la respuesta no fue exitosa
            if (!response.ok) {
                // Lanzar un error con el mensaje recibido o un mensaje por defecto
                throw new Error(data.msg || "Error en el registro");
            }
    
            // **Nuevo**: Almacenar el token en el estado global (`store`)
            setStore({ token: data.access_token });
    
            // **Nuevo**: Almacenar el token en `localStorage` para mantener la sesión abierta
            localStorage.setItem("token", data.access_token);
    
            // Retornar `true` para indicar que el registro fue exitoso
            return true;
        } catch (error) {
            // Manejar errores y mostrar un mensaje en la consola
            console.log("Error en el registro:", error);
    
            // Retornar un objeto con el mensaje de error
            return { msg: error.message };
        }
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
            setStore({ token: null, username: null }); // Asegúrate de limpiar el username en caso de error
            return false;
          }

          let data = await response.json();
          setStore({ token: data.token, username: data.username }); // Guarda el username en el store
          localStorage.setItem("token", data.token);
          return true;
        } catch (error) {
          console.error("Error en la solicitud de login:", error);
          setStore({ token: null, username: null });
          return false;
        }
      },

    //   loadSession: async () => {
    //     let localStorage = localStorage.setItem("token");
    //     if (!localStorage) return;
        
    //     setStore({ token: localStorage });
        
    //     let resp = await fetch(process.env.BACKEND_URL + "/api/userinfo", {
    //         headers: {
    //             Authorization: "Bearer " + localStorage,
    //         },
    //     });
        
    //     if (!resp.ok) {
    //         setStore({ token: null });
    //         localStorage.removeItem("token");
    //         return false;
    //     }
        
    //     let data = await resp.json();
    //     setStore({ userInfo: data });
    //     return true;
    // },

    //   getUsername: async () => {
    //     // ESTA FUNCION TOMA LOS DATOS DEL USUARIO PARA MOSTRAR EN EL PROFILE CARD AUN NO ESTA TERMINADA FALTA CONCATENAR CON EL BACK
    //     const store = getStore();
    //     const token = store.token;

    //     if (token) {
    //       try {
    //         const response = await fetch(
    //           process.env.BACKEND_URL + "/api/profile",
    //           {
    //             method: "GET",
    //             headers: {
    //               "Content-Type": "application/json",
    //               Authorization: `Bearer ${token}`,
    //             },
    //           }
    //         );

    //         if (response.ok) {
    //           const data = await response.json();
    //           setStore({ username: data.username });
    //         } else {
    //           console.error("Error al obtener el nombre de usuario.");
    //         }
    //       } catch (error) {
    //         console.error("Error al obtener el nombre de usuario:", error);
    //       }
    //     }
    //   },

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
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.ok) {
              // Limpiar token del store
              setStore({ token: null });
              localStorage.removeItem("token");
              alert("¡Cierre de sesión exitoso!");
            } else {
              alert("Error al cerrar sesión. Inténtalo de nuevo.");
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
