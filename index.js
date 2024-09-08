const usuarios = require('./controllers/usuarios');
const cursos = require('./controllers/cursos');


const express = require('express');
const mongoose = require('mongoose'); 
// Conexión a la dase de datos mongodb
mongoose.connect ('mongodb+srv://donovanboni:AMGhSKt7mD0eApIf@cluster0.3kkiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB.. '))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));
// middlewareconst 
app = express();
app.use (express.json());
app.use (express.urlencoded ({extended: true}));

//end-points  (recursos)

app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);


const port = process.env.PORT || 3000;
app. listen(port, () => {
    console. log('Api REST Ok, y ejecutándose...');
})