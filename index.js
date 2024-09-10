const express = require('express');
const https = require ('https');
const fs = require ('fs');
const path = require('path');
const mongoose = require('mongoose'); 
const cors = require ('cors'); //importa el midelware de cors
const { swaggerUi, swaggerSpec } = require('./swagger/Swagger'); // Importa Swagger

// Conexión a la dase de datos mongodb

// Importar rutas
const cursosRoutes = require('./routes/cursos_routes');
const usuariosRoutes = require('./routes/usuarios_routes');

// Importar la función de semillas
const seedDatabase = require('./seed/seeds');

//midelware
// Crear la aplicación Express
const app = express();

const corsOptions = {
    origin: '*', //reemplaza con el dominio permitido 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], //METODOS PERMITIDOS
    allowedHeaders: ['Content-Type', 'Authorization'], //encabezados permitidos
};
app.use(cors(corsOptions));//Habilita cors con las acciones especificas
app.options('*', cors(corsOptions));//

//Carga el certificado SSl y la Clave privada
const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem')),
};

app.use (express.json());
app.use (express.urlencoded ({extended: true}));
// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión a la dase de datos mongodb
mongoose.connect ('mongodb+srv://donovanboni:AMGhSKt7mD0eApIf@cluster0.3kkiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true})
.then(async () => {
    console.log('Conectado a MongoDB');

        // Ejecutar la siembra de la base de datos
        await seedDatabase();

/*Endpoint recurso rutas
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);
*/


// Rutas de la aplicación
app.use('/api/cursos', cursosRoutes);
app.use('/api/usuarios', usuariosRoutes);

 // Manejo de errores
 app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


 // Iniciar el servidor
 const PORT = process.env.PORT || 3000;

 https.createServer(options, app).listen(PORT, () => {
    console.log('Api Rest OK y ejecutandose...');
    console.log('Servidor https corriendo en https://localhost:3000');
});

})
.catch(err => console.log('No se pudo conectar con MongoDB..', err));
