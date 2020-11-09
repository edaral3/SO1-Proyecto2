module.exports = app => {
    const caso = require("../controllers/caso");

    var router = require("express").Router();

    // Devuelve todos los casos
    router.get("/getAllMongo", caso.getAllMongo);

    // Devuelve el ultimo valor agregado
    router.get("/getRedis", caso.getRedis);

    // La ruta de la api de productos sera url/productos
    app.use("/", router);
};