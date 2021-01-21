const express = require('express')
require('dotenv').config();
var cors = require('cors')

const {dbConection} = require('./database/config')
// Crear el servidor de express
const app = express();

//Configurar Cors
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/login', require('./routes/auth') );

app.listen( process.env.port, ()=>{
    console.log('Servidor montado en ' + process.env.port)
})