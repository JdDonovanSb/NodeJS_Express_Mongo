const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();


ruta.get('/', (req, res) => {
    res.json('respuesta a petición get de Usuarios funcionando correctamente...');
});


module.exports = ruta;