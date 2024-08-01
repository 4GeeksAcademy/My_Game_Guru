"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import requests

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/fetch-steam-apps', methods=['GET'])
def fetch_steam_apps():
    try:
        url = "http://api.steampowered.com/ISteamApps/GetAppList/v2/"
        response = requests.get(url)
        if response.status_code == 200:
            get_all_game_list = response.json()['applist']['apps']
            for game in get_all_game_list:
                existing_game = # nombre_de_la_tabla_gamelist.query.filter_by(appid=app['appid']).first()
                if not existing_game:
                    new_app = # nombre_de_la_tabla_gamelist(game_id=game['appid'], name=game['name'])
                    db.session.add(new_app)
            db.session.commit()
            return jsonify({"message": "Datos almacenados con éxito."}), 200
        else:
            return jsonify({"error": "Error al obtener datos de la API."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
