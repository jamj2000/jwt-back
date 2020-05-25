const cors = require('cors');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./api-routes');
const authRoutes = require('./auth-routes')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config.js');

const app = express();





// CONEXIÓN A BASE DE DATOS
mongoose.connect(config.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log("Conexión a BD correcta"))
    .catch(error => console.log("Error al conectarse a la BD" + error));


// MIDDLEWARE
app.use(cors());            // Soporte para CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname , 'public')));

function authenticateToken (req, res, next) {
    // console.log(req.headers['authorization']);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send("Sin autorización"); //res.sendStatus(401)
  
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, usuario) => {
      if (err) return res.status(403).send("Acceso denegado") //res.sendStatus(403)
      req.usuario = usuario
      next()
    })
  }

// RUTAS
app.use('/api',  authenticateToken, apiRoutes);
app.use('/auth', authRoutes);


app.listen(config.PORT, () => console.log(`Servidor iniciado en puerto ${config.PORT}`));
