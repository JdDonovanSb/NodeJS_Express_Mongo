const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

//Endpoint de tipo get refactorizado para el recurso Cursos. Lista todos los Cursos
ruta.get('/', (req, res) => {
    let resultado = listarCursosActivos();
    resultado.then(cursos => { 
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
});

//Endpoint de tipo POST para el recurso usuarios
ruta.post('/', (req, res) => {
        let resultado = crearCurso(req.body);

        resultado.then(curso => {
            res.json({
                curso
            })
        }).catch(err => {
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

//Endpoint de tipo Delete parael recurso  Cursos
ruta.delete('/:id', (req, res)=>{
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso=>{
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
async function crearCurso(body) {
        let curso = new Curso({
            titulo:    body.titulo,
            descripcion:   body.descripcion,
            alumnos: body.alumnos, 
            calificacion: body.calificacion
        });
        return await curso.save();    
}

//Funcion asincrona para activar o inactivar un curso
async function desactivarCurso (id){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, {new:true});
    return curso;
}

//Funcion asincrona para Listar todos los cursos activos
async function listarCursosActivos(){
    let cursos = await Curso.find({"estado": true});
    return cursos;
}

module.exports = ruta;