const moongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    titulo: {
        type:String, 
        required: true
    }, 
    descripcion: {
        type:String, 
        required:false 
    }, 
    estado: {
        type: Boolean, 
        default: true
    }, 
    imagen: {
        type: Number, 
        default: false
    }, 
    alumnos: {
        type: Number,
        default: 0
    },
    calificacion: {
        type: Number, 
        default: 0
    }
});

module.exports = mongoose.model('curso', cursoSchema);