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

exports.getRedis= (_req, res) => {
    /*r.keys('*', (err, keys) => {
        console.log(keys)
      });*/
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