const express = require('express');
const logic = require('../logic/curso_logic')
const ruta = express.Router();

//Endpoint de tipo get refactorizado para el recurso Cursos. Lista todos los Cursos
ruta.get('/', (req, res) => {
    let resultado = logic.listarCursosActivos();
    resultado.then(cursos => { 
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
});

//Endpoint de tipo POST para el recurso usuarios
ruta.post('/', (req, res) => {
        let resultado = logic.crearCurso(req.body);

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
        let resultado = logic.actualizarCurso(req.params.id, req.body);
        resultado.then(curso =>{
            res.json(curso)
        }).catch(err =>{
            res.status(400).json(err)
        })
    })

//Endpoint de tipo Delete parael recurso  Cursos
ruta.delete('/:id', (req, res)=>{
    let resultado = logic.desactivarCurso(req.params.id);
    resultado.then(curso=>{
        res.json(curso)  
    }).catch(err =>{
        res.status(400).json(err)
    })
})  
    
module.exports = ruta;