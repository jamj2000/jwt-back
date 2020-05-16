const cors = require('cors');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./api-routes');
const authRoutes = require('./auth-routes')
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost/datos';


// CONEXIÓN A BASE DE DATOS
mongoose.connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log("Conexión a BD correcta"))
    .catch(error => console.log("Error al conectarse a la BD" + error));


// MIDDLEWARE
app.use(cors());            // Soporte para CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname , 'public')));


// RUTAS
app.use('/api',  apiRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
