const express = require('express')
require('dotenv').config();
var cors = require('cors')

const {dbConection} = require('./database/config')
// Crear el servidor de express
const app = express();

//Configurar Cors
app.use(cors());

// Base de datos
dbConection();

// Rutas
app.get('/',(req,res)=>{
    res.json({
        ok: 'true',
        msg: 'angel re bien wacho'
    })
})

app.listen( process.env.port, ()=>{
    console.log('Servidor montado en ' + process.env.port)
})