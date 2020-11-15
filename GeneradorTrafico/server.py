from flask import Flask, jsonify, request, abort
from bson.json_util import dumps

app = Flask(__name__)


# Agragar datos a la base de datos mongo
@app.route('/prueba', methods=['POST'])
def prueba():
    print(request.json)
 
    return jsonify({'response': "Datos insertados de forma correcta."}), 200
  

if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=4000)
