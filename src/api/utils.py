from flask import jsonify, url_for
import requests
import openai
import os

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"

# Funcion que devuelve un JSON con la informacion de un juego
def get_info_game(id):
    try:
        url = f'https://store.steampowered.com/api/appdetails?appids={id}'
        response = requests.get(url)
        if response.status_code == 200:
            game_details = response.json()[id]
            
            return game_details
    except Exception as e:
        return None

# Funcion que genera sugerencias de juegos recibiendo especificaciones del cliente    
def generate_suggestions(client_specifications):
        # Configuracion de clave API de OpenAI revisar
        openai.api_key = os.getenv("OPENAI_API_KEY")

        response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=f'''
                Eres el mejor experto en videojuegos de la pagina de steam. 
                Tu tarea es procesar las especificaciones del cliente y devolver el appid de 5 juegos recomendados de Steam según esas especificaciones. 
                Además, debes evaluar el lenguaje del cliente y si detectas lenguaje indebido, sexual u obsceno e incoherencias en su pedido, 
                debes devolver la frase "No puedo procesar tu pedido, algo está incorrecto en tu petición".
                Recuerda que solo puedes recomendar juegos de la pagina oficial de steam.

                Especificaciones del cliente:
                {client_specifications}

                Reglas:
                1. Si el texto contiene lenguaje indebido, sexual u obsceno, responde con "No puedo procesar tu pedido, algo está incorrecto en tu petición".
                2. Si el texto es incoherente o no tiene sentido, responde con "No puedo procesar tu pedido, algo está incorrecto en tu petición".
                3. Si las especificaciones del cliente son claras y apropiadas, responde con los appid de 5 juegos recomendados de Steam según las condiciones del cliente.

                Ejemplos de especificaciones coherentes:
                - "Quiero juegos de aventura con buena narrativa."
                - "Busco juegos de estrategia que no requieran conexión constante a internet."
                - "Prefiero juegos de rol con gráficos impresionantes y una historia profunda."

                Ejemplos de especificaciones incorrectas:
                - "Quiero juegos de mierda que sean buenos."
                - "asdfjkl;"
                - "Juegos que sean lo máximo para jugar."
                - "Quiero un juego hentai."
                - "Quiero un juego sexual."

                Respuesta:
                ''',
                max_tokens=150
            )
        return response.choices[0].text.strip()

