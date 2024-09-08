const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    res.json('respuesta a petición get de cuersosfuncionando correctamente...');
});

//Endpoint de tipo POST para el recurso usuarios
ruta.post('/', (req, res) => {
        let resultado = CrearCurso(body);

        resultado.then(curso =>{
            res.json({
                 curso
            })
        }).catch (err =>{
            res.status(400).json({
                err
            })
        })
});

// Endpoint de tipo Put para el recurso cursos
ruta.put ('/:id', (req, res)=>{
        let resultado = actualizarCurso(req.params.id, req.body);
        resultado.then(curso =>{
            res.json(curso)
        }).catch(err =>{
            res.status(400).json(err)
        })
    })
    
 //Función asincrona para Actualizar cursos

 async function actualizarCurso(id, body){
    let curso = await Curso.findByIdAndUpdate(id,{ 
        $set: {
            titulo: body.titulo, 
            descripcion: body.descripcion
        }
    },{new: true});
        return curso;
}

//funcion asincrona para craer un objeto de tipo curso
async function Crearcurso(body) 
{
        let usuario = new Curso({
            titulo:    body.titulo,
            descripcion:   body.descripcion,
            alumnos: body.alumnos, 
            calificacion: body.calificacion
        });
        return await curso.save();    
}



module.exports = ruta;