const express = require('express');
const Usuario = require('../models/usuario_model');
const Joi = require('@hapi/joi');
const ruta = express.Router();


ruta.get('/', (req, res) => {
    res.json('respuesta a petición get de Usuarios funcionando correctamente...');
});

//Validaciones para el objeto usuario
const schema = Joi.object({
nombre: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[A-Za-záéíóú ]{3,30}$/),

    password: Joi.string() 
    .pattern(/^[a-zA-Z0-9]{3,30}$/),

    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'edu', 'co']}})

});


























//funcion asincrona para craer un objeto de tipo usuario 
async function CrearUsuario(body) 
{
        let usuario = new Usuario({
            email:    body.email,
            nombre:   body.nombre,
            password: body.password
        });
        return await usuario.save();    
}


module.exports = ruta;