const Curso = require('../models/curso_model');

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

//funcion asincrona para crer un objeto de tipo curso
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

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}
