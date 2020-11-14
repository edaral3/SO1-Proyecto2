from concurrent import futures
import logging
import json
from pymongo import MongoClient
from bson.json_util import dumps
import redis
import grpc
import helloworld_pb2
import helloworld_pb2_grpc

#Datos de conexión base de datos redis
r = redis.Redis(host = '3.21.97.128', port = 80)

#Datos de conexión base de datos mongo
client = MongoClient('18.217.45.142:80')
db = client["infectados"]
col = db["caso"]

class Greeter(helloworld_pb2_grpc.GreeterServicer):

    def SayHello(self, request, context):
        cadena = request.name
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
        return helloworld_pb2.HelloReply(message=request.name)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    helloworld_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    print('Server inicializado')
    print('Esperando mensajes...')
    logging.basicConfig()
    serve()