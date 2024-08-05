"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User , TokenBlockedList
from api.utils import generate_sitemap, APIException, get_info_game, generate_suggestions
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import get_jwt, JWTManager, create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Configuración de JWT
# app = Flask(__name__)
# app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Cambia esto por una clave secreta segura
# jwt = JWTManager(app)
# @api.route('/fetch-steam-apps', methods=['GET'])
# def fetch_steam_apps():
#     try:
#         url = "http://api.steampowered.com/ISteamApps/GetAppList/v2/"
#         response = requests.get(url)
#         if response.status_code == 200:
#             all_game_list = response.json()['applist']['apps']
#             for game in all_game_list:
#                 existing_game = GameList.query.filter_by(game_id=game['appid']).first()
#                 if not existing_game:
#                     new_app = GameList(game_id=game['appid'], game_name=game['name'])
#                     db.session.add(new_app)
#             db.session.commit()
#             return jsonify({"message": "Datos almacenados con éxito."}), 200
#         else:
#             return jsonify({"error": "Error al obtener datos de la API."}), 400
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# Endpoint para registrar usuarios
@api.route('/signup', methods=['POST'])
def signup():
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not username or not email or not password:
        return jsonify({"msg": "Missing username, email or password"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

# Endpoint para iniciar sesión y obtener un token JWT
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

#endpoint para cierre de sesion
@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    jti = get_jwt()["jti"]
    token_blocked=TokenBlockedList(jti=jti)

    db.session.add(token_blocked)
    db.session.commit()

    return jsonify({"msg": "Logout Succes"})

# Endpoint para obtener sugerencias de juegos
@api.route('/suggestions', methods=['POST'])
@jwt_required
def get_suggestions():
    try:
        client_propmt = request.get_json()["user_promp"]

        if not client_propmt:
            return jsonify({"error": "No se proporcionó un prompt"}), 400
        
        suggestions = generate_suggestions(client_propmt)
        print(f'esta es la respuesta Chat GPT API: {suggestions} ')

        if suggestions == "No puedo procesar tu pedido, algo está incorrecto en tu petición":
            return jsonify({"error": "Lenguaje inadecuado o frase incoherente, intentalo nuevamente"}), 400

        suggestions_list = suggestions.split()

        result = {}
        for game_id in suggestions_list:
            game_details=get_info_game(game_id)
            result[game_id] = game_details

        return jsonify({"result": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Endpoint de ejemplo protegido por JWT
@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.username), 200

# Endpoint de ejemplo sin protección
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200