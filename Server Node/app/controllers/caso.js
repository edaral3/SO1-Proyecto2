const db = require("../models");

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


exports.getAll2 = (_req, res) => {
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