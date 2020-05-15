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
// app.use(express.json());    // IMPORTANTE: Poner esto antes de las rutas



app.use('/api',  apiRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname , 'public')));

app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));


// -------------------------


// const PORT = process.env.PORT || 3000;
// const path = require('path');

// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, 'json-samples/series.json'));
// //const middlewares = jsonServer.defaults();

// // bodyParser, load json-server instance to use in this module
// server.use(jsonServer.bodyParser)

// // Use json-server middlewares 
// //server.use(middlewares);

// // configure user storage in memory
// const userStorage = require('./security/users-storage')({
//   email: 'user@example.com',
//   password: '1234'
// });
// userStorage.logUsers();

// // Route for login
// const login = require('./routes/login-route')(userStorage);
// server.post('/login', login);

// // Route for sign-in
// const register = require('./routes/sign-in-route')(userStorage);
// server.post('/sign-in', register);

// // Auth middleware 
// // if (yargs.argv.authentication === 'true') {
//   const authMiddleware = require('./middleware/auth-middleware');
//   server.use(authMiddleware);
// // }

// // delay middleware
// // const delayMiddleware = require('./middleware/delay-middleware')(500);
// // server.use(delayMiddleware);

// // Token verify route
// const verify = require('./routes/verify-route');
// server.get('/verify', verify);

// // Start JSON Server
// server.use(router);
// server.listen(PORT, () => console.log(`JSON Server running on port ${PORT}`));

// ---------------------------------------

// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3000;

// server.use(middlewares);
// server.use(router);

// server.listen(port);