"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User , TokenBlockedList, Recommendation
from api.utils import generate_sitemap, APIException, get_info_game, generate_suggestions
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import get_jwt, JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
import requests
import json


api = Blueprint('api', __name__)
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Allow CORS requests to this API
CORS(api)


# Endpoint para registrar usuarios
@api.route('/signup', methods=['POST'])
def signup():
    # Obtención de datos del formulario de registro
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # Verificación de que todos los campos necesarios están presentes
    if not username or not email or not password:
        return jsonify({"msg": "Falta nombre de usuario, correo electrónico o contraseña"}), 400

    # **Nuevo: Verificación si el nombre de usuario ya existe**
    existing_username = User.query.filter_by(username=username).first()
    if existing_username:
        return jsonify({"msg": "El nombre de usuario ya existe"}), 409  # Código 409 para conflicto

    # **Nuevo: Verificación si el correo electrónico ya existe**
    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({"msg": "El correo electrónico ya está en uso"}), 409  # Código 409 para conflicto

    # Si no hay conflictos, procedemos a crear el nuevo usuario
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)

    # Añadimos y confirmamos la nueva entrada en la base de datos
    db.session.add(new_user)
    db.session.commit()

    # Devolvemos un mensaje de éxito
    return jsonify({"msg": "Usuario creado exitosamente"}), 201
# Endpoint para iniciar sesión y obtener un token JWT


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Falta correo electrónico o contraseña"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Correo electrónico o contraseña incorrectos"}), 401

    # **Modificado: Devolvemos el token JWT en un objeto JSON con la clave "access_token"**
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token":access_token,"username":user.username}), 200



@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    token = get_jwt()  # Obtiene el token actual
    jti = token['jti']  # El identificador único del token (JTI)
    blocked_token = TokenBlockedList(jti=jti)  # Crea una instancia del token bloqueado
    db.session.add(blocked_token)  # Agrega a la sesión de la base de datos
    db.session.commit()  # Guarda en la base de datos

    response = jsonify({"msg": "Logout successful"})
    return response, 200


@api.route('/userinfo', methods=['GET'])
@jwt_required()
def userinfo():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        return jsonify({
            "username": user.username,
            "email": user.email
            # Añade cualquier otra información del usuario que quieras devolver
        }), 200
    else:
        return jsonify({"msg": "Usuario no encontrado"}), 404


@api.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    # Obtén la identidad del usuario del token JWT
    current_user_id = get_jwt_identity()
    
    # Encuentra el usuario en la base de datos por su ID
    user = User.query.get(current_user_id)
    
    # Verifica si el usuario existe
    if user:
        # Devuelve los detalles del usuario (en este caso, solo el nombre de usuario)
        return jsonify({"username": user.username}), 200
    else:
        # Si el usuario no existe, devuelve un error
        return jsonify({"msg": "Usuario no encontrado"}), 404


# Endpoint para obtener sugerencias de juegos
@api.route('/suggestions', methods=['POST'])
#@jwt_required
def get_suggestions():
    client_specifications = request.get_json()["user_prompt"]
    response_body = {}

    # Tu tarea es procesar las especificaciones del cliente y devolver el appid de 6 juegos recomendados de Steam según esas especificaciones. 
    #             Además, debes evaluar el lenguaje del cliente y si detectas lenguaje indebido, sexual u obsceno e incoherencias en su pedido, 
    #             Recuerda que solo puedes recomendar juegos de la pagina oficial de steam.
    #             la repuesta solo debe tener el appid de los 6 juegos recomendados, sin nombres, solo los 6 appid separados por espacios en blanco.
    
    data = request.json
    prompt = data.get('prompt', f'''
                Quiero seis recomendaciones de juegos en Steam que sean similares a {client_specifications}. 
                Me gustaría que se asemejen en género, estilo y jugabilidad.
                Por favor, proporciona la salida en formato JSON incluyendo el app ID de Steam.
                ''')
    
    
    openai_url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }
    openai_data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.0,
        "max_tokens": 150
    }

    try:
        
        response = requests.post(openai_url, headers=headers, json=openai_data)
        print(response)
        response.raise_for_status()  
        recommendations = response.json().get('choices', [])
        
        
        response_body['recommendations'] = recommendations
        data = response_body['recommendations'][0]['message']['content']
        data = json.loads(data)
        return jsonify(data), 200
    

    except requests.exceptions.HTTPError as e:
        response_body['message'] = f'Error fetching: {str(e)}'
        return jsonify(response_body), 500

    
# Endpoint para mostrar resultados
@api.route('/game/<int:app_id>')
def get_game_details(app_id):
    url = f'https://store.steampowered.com/api/appdetails?appids={app_id}'

    # Hacer la petición a la API de Steam
    response = requests.get(url)

    # Verificar si la petición fue exitosa
    if response.status_code == 200:
        # Obtener los datos JSON de la respuesta
        data = response.json()
        
        # Devolver los datos como JSON
        return jsonify(data)
    else:
        # Si hubo un error, devolver un mensaje de error
        return jsonify({'error': 'No se pudo obtener la información del juego'}), 404

# Endpoint que agrega un item a favoritos
@api.route('/favouritegames/<int:app_id>', methods=['POST'])
@jwt_required()
def add_favourite_game(app_id):
    current_user_id = get_jwt_identity()
    existing_favourite = Recommendation.query.filter_by(user_id=current_user_id, game_id=app_id).first()
    if existing_favourite is not None: 
        return jsonify({"msg": "este juego ya existe en favoritos"}), 400
    else:
        new_favourite = Recommendation(user_id=current_user_id, game_id=app_id)
        db.session.add(new_favourite)
        db.session.commit()
        return jsonify({"msg": "favorito agregado exitosamente"}), 200


# Endpoint que devuelve todos los favoritos del usuario activo
@api.route('/favouritegames', methods=['GET'])
@jwt_required()
def get_favourite_games():
    current_user_id = get_jwt_identity()
    favourite_list = Recommendation.query.all()
    result = []
    for f in favourite_list:
        user_id= f.user_id
        if user_id == current_user_id:
            result.append(f.game_id)
    return jsonify({"result": result}), 200

# Endpoint para eliminar un item de favoritos
@api.route('/favouritegames/<int:app_id>', methods=['DELETE'])
@jwt_required()
def delete_favourite_game(app_id):
    current_user_id = get_jwt_identity()
    game_delete_id = app_id
    delete_favorite = Recommendation.query.filter_by(user_id=current_user_id, game_id= game_delete_id).first()
    if delete_favorite is None:
        return jsonify({"message": "Favorite Game not found"}), 404
    db.session.delete(delete_favorite)
    db.session.commit()
    return jsonify({"message": "Juego favorito eliminado exitosamente"}), 200
    

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

