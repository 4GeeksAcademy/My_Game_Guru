"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User , TokenBlockedList
from api.utils import generate_sitemap, APIException, get_info_game, generate_suggestions
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import get_jwt, JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
import requests


api = Blueprint('api', __name__)
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Allow CORS requests to this API
CORS(api)


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
#@jwt_required
def get_suggestions():
 
    client_specifications = request.get_json()["user_prompt"]
    response_body = {}
    
    data = request.json
    prompt = data.get('prompt', f'''
                Eres el mejor experto en videojuegos de la pagina de steam. 
                Tu tarea es procesar las especificaciones del cliente y devolver el appid de 5 juegos recomendados de Steam según esas especificaciones. 
                Además, debes evaluar el lenguaje del cliente y si detectas lenguaje indebido, sexual u obsceno e incoherencias en su pedido, 
                Recuerda que solo puedes recomendar juegos de la pagina oficial de steam.
                la repuesta solo debe tener el appid de los 5 juegos recomendados, sin nombres, solo los 5 appid separados por espacios en blanco.

                Especificaciones del cliente:
                {client_specifications}

                Respuesta:
                ''')
    
    
    openai_url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    openai_data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.0,
        "max_tokens": 150
    }

    try:
        
        response = requests.post(openai_url, headers=headers, json=openai_data)
        response.raise_for_status()  
        recommendations = response.json().get('choices', [])
        
       
        response_body['recommendations'] = recommendations

        return jsonify(response_body), 200
    

    except requests.exceptions.HTTPError as e:
        response_body['message'] = f'Error fetching: {str(e)}'
        return jsonify(response_body), 500


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

