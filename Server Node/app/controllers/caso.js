const db = require("../models");
var redisScan = require('redisscan');
var redis = require('redis');
var r = redis.createClient('redis://3.21.97.128:80');

// Obtener todos los productos
exports.getAll = (_req, res) => {
    db.mongoose.connection.db.collection("caso", function(err, collection){
        collection.conut({column_name: "location"}).toArray(function(err, data){
            if (err){
                return res
                    .status(400)
                    .send({ message: "Error obteniendo datos." });
            }
            return res
                .status(200)
                .send({ message: "datos devueltos", data: data });
        })
    });
};

exports.getAllMongo = (_req, res) => {
    db.mongoose.connection.db.collection("caso", function(err, collection){
        collection.find({}).toArray(function(err, data){
            if (err){
                return res
                    .status(400)
                    .send({ message: "Error obteniendo datos." });
            }
            return res
                .status(200)
                .send({ message: "datos devueltos", data: data });
        })
    });
};

exports.getRangoEdad = (_req, res) => {
    db.mongoose.connection.db.collection("caso", function(err, collection){
        collection.find({}).toArray(function(err, data){
            if (err){
                return res
                    .status(400)
                    .send({ message: "Error obteniendo datos." });
            }

            let rangos = [{edades:"0 - 10",cantidad:0},
            {edades:"11 - 20",cantidad:0},{edades:"21 - 30",cantidad:0},{edades:"31 - 40",cantidad:0},{edades:"41 - 50",cantidad:0},
            {edades:"51 - 60",cantidad:0},{edades:"61 - 70",cantidad:0},{edades:"71 - 80",cantidad:0},{edades:"81 - 90",cantidad:0},
            {edades:"91 - 100",cantidad:0},{edades:"+100",cantidad:0}]

            for(let i = 0; i < data.length ;i++){
                if(data[i].age<11){
                    rangos[0].cantidad += 1
                }
                else if(data[i].age<21){
                    rangos[1].cantidad += 1
                }
                else if(data[i].age<31){
                    rangos[2].cantidad += 1
                }
                else if(data[i].age<41){
                    rangos[3].cantidad += 1
                }
                else if(data[i].age<51){
                    rangos[4].cantidad += 1
                }
                else if(data[i].age<61){
                    rangos[5].cantidad += 1
                }
                else if(data[i].age<71){
                    rangos[6].cantidad += 1
                }
                else if(data[i].age<81){
                    rangos[7].cantidad += 1
                }
                else if(data[i].age<91){
                    rangos[8].cantidad += 1
                }
                else if(data[i].age<101){
                    rangos[9].cantidad += 1
                }
                else{
                    rangos[10].cantidad += 1
                }
            }

            return res
                .status(200)
                .send({ message: "datos devueltos", data: rangos });
        })
    });
};

exports.getTop3 = (_req, res) => {
    db.mongoose.connection.db.collection("caso", function(err, collection){
        collection.find({}).toArray(function(err, data){
            if (err){
                return res
                    .status(400)
                    .send({ message: "Error obteniendo datos." });
            }

            let listaDepartamentos = []

            let existeDepartamento;

            for(let i = 0; i < data.length ;i++){
                existeDepartamento = true;
                for(let j = 0; j < listaDepartamentos.length ; j++){
                    if(listaDepartamentos[j].nombre == data[i].location){
                        existeDepartamento = false
                        listaDepartamentos[j].cantidad += 1
                    }
                }
                if(existeDepartamento){
                    listaDepartamentos.push({
                        cantidad: 1,
                        nombre: data[i].location
                    })
                }
            }

            let aux;

            for(let i = 0; i < listaDepartamentos.length; i++){
                for(let j = 0; j < listaDepartamentos.length - 1; j++){
                    if(listaDepartamentos[j].cantidad < listaDepartamentos[j+1].cantidad){
                        aux = listaDepartamentos[j] 
                        listaDepartamentos[j] = listaDepartamentos[j+1]
                        listaDepartamentos[j+1] = aux
                    }
                }
            }

            let top3 = [];
            let total = 0;
            for(let i = 0 ; i < listaDepartamentos.length && i < 3 ;i++){
                top3.push(listaDepartamentos[i]);
                total += listaDepartamentos[i].cantidad;
            }
            	
            for(let i; i < top3.length;i++){
                top3[i].porcentaje = (top3[i].cantidad/total)*100;
            }
            	
            return res
                .status(200)
                .send({ message: "datos devueltos", data: top3 });
        })
    });
};

exports.getAllDepartamentos= (_req, res) => {
    db.mongoose.connection.db.collection("caso", function(err, collection){
        collection.find({}).toArray(function(err, data){
            if (err){
                return res
                    .status(400)
                    .send({ message: "Error obteniendo datos." });
            }

            let listaDepartamentos = []

            let existeDepartamento;

            for(let i = 0; i < data.length ;i++){
                existeDepartamento = true;
                for(let j = 0; j < listaDepartamentos.length ; j++){
                    if(listaDepartamentos[j].nombre == data[i].location){
                        existeDepartamento = false
                        listaDepartamentos[j].cantidad += 1
                    }
                }
                if(existeDepartamento){
                    listaDepartamentos.push({
                        cantidad: 1,
                        nombre: data[i].location
                    })
                }
            }

            return res
                .status(200)
                .send({ message: "datos devueltos", data: listaDepartamentos });
        })
    });
};

exports.getRedis= (_req, res) => {
    r.lpop('caso', (err, val) => {
        if (err) { 
            return res
            .status(400)
            .send({ message: "Error obteniendo datos." });
        }
        r.lpush('caso',val);
        return res
            .status(200)
            .send({ message: "Error obteniendo datos.", data: val });
      })
      
     
};