from flask import Flask, jsonify, request, abort
from pymongo import MongoClient
from bson.json_util import dumps
import redis

#Conexion base de dartos redis
r = redis.Redis(host = '3.21.97.128', port = 80)

#Conexion base de datos mongo
client = MongoClient('18.217.45.142:80')
db = client["infectados"]
col = db["caso"]

app = Flask(__name__)


# Agragar datos a la base de datos mongo
@app.route('/insertarMongo', methods=['POST'])
def insertarMongo():
    if not request.json or not 'Casos' in request.json:
        abort(400)
    try:
        x = col.insert_many(request.json["Casos"])
        print(x)
        return jsonify({'response': "Datos insertados de forma correcta."}), 201
    except:
        return jsonify({'response': 'Error al intentar insertar en la base de datos.'}), 500
   
# Agragar datos a la base de datos
@app.route('/getAllMongo', methods=['GET'])
def cantidadNotas():
    try:
        data = col.find()
        return jsonify({'response': dumps(data)}), 200
    except:
        return jsonify({'response': 'Error al obtener informacionde de la base de datos.'}), 500


# Agragar datos a la base de datos redis
@app.route('/insertarRedis', methods=['POST'])
def insertarRedis():
    if not request.json or not 'Casos' in request.json:
        abort(400)
    try:
        for i in request.json["Casos"]:
            r.lpush("caso", dumps(i))
        return jsonify({'response': "Datos insertados de forma correcta."}), 200
    except:
        return jsonify({'response': 'Error al intentar insertar datos en el server'}), 500

if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)
