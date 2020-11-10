module.exports = app => {
    const caso = require("../controllers/caso");

    var router = require("express").Router();

    // Devuelve todos los casos
    router.get("/getAllMongo", caso.getAllMongo);

    // Devuelve los 3 departamentos con mas casos de COVID-19
    router.get("/getTop3", caso.getTop3);

    // Devuelve los departamentos que tienen casos del COVID-19
    router.get("/getDepartamentos", caso.getAllDepartamentos);
   
    // Devuelve los casos de COVID-19 por rango de edades
    router.get("/getRangoEdad", caso.getRangoEdad);
     
    // Devuelve el ultimo valor agregado
    router.get("/getRedis", caso.getRedis);

    // La ruta de la api de productos sera url/productos
    app.use("/", router);
};