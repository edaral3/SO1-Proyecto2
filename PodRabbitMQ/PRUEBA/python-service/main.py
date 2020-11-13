import pika
import json
from pymongo import MongoClient
from bson.json_util import dumps
import redis

#Datos de conexión base de datos redis
r = redis.Redis(host = '3.21.97.128', port = 80)

#Datos de conexión base de datos mongo
client = MongoClient('18.217.45.142:80')
db = client["infectados"]
col = db["caso"]

#Datos de conexión pika lectura RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', port='5672'))
channel = connection.channel()
channel.queue_declare(queue='sopes1')

def callback (ch, method, properties, body):
    cadena = str(body, 'utf-8')
    jsoncadena = json.loads(cadena)
    print (jsoncadena)
    # Agragar datos a la base de datos mongo
    try:
        col.insert_one(jsoncadena)
        print("Datos insertados de forma correcta en mongo")
    except:
        print('Error al insertar los datos a mongo')
    # Agragar datos a la base de datos redis
    try:
        r.lpush("caso", dumps(jsoncadena))
        print("Datos insertados de forma correcta en redis")
    except:
        print('Error al insertar los datos a redis')
    print('Esperando mensajes...')

#Metodo de lectura de cola de mensajes RabbitMQ
print('Server inicializado')
channel.basic_consume(queue='sopes1', on_message_callback=callback, auto_ack=True)
print('Esperando mensajes...')
channel.start_consuming()