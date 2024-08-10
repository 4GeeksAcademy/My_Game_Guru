const apiUrl = process.env.BACKEND_URL + "/api";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			appidsGame:null,
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
				  let response = await fetch(STEAM_API_URL+gameID);
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

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
