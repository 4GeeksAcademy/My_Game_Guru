import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { GameSuggestor } from "../component/GameSuggestor";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(()=>{
        if(store.token != null){
            const save_favourites = async() => {
                try {
                    let get_favourites = await fetch(`${process.env.BACKEND_URL}/api/favouritegames`, {
                        "method" : ["GET"],
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            Authorization: `Bearer ${store.token}`
                        }
                    })
                    const response = await get_favourites.json();
                    store.favorites = response['result']; 
                    console.log(store.favorites)
                
                    
                } catch (error) {
                    console.error({"msg": "ERROR AL OBTENER FAVORITOS", error})
                }
            }
    
            save_favourites();
        }
        
    },[store.token, store.appidsGame])

    return <GameSuggestor />;
};
