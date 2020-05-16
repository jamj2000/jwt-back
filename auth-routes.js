const { Usuario } = require("./models.js");
const express = require("express");
const delay = require('delay');
const jwt = require('jsonwebtoken');


const ACCESS_TOKEN_SECRET = 'json-back';
const VALIDEZ = "15m";


/** verifica al usuario a partir del token  */
exports.verify = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET)
  }
  catch (err) {
    return false
  }
}



const userStorage = require('./security/users-storage')({
  email: 'jose@gmail.com',
  password: 'jose'
});
//userStorage.logUsers();

// const login = require('./routes/login-route')(userStorage);
// const signup = require('./routes/signup-route')(userStorage);
// const verify = require('./routes/verify-route');

function login(req, res) {
  let usuario = req.body;
  console.log(usuario);
  delay(1000).then(() => {
    if (userStorage.userExists(usuario)) {
      console.log('Datos de usuario válidos');
      const token = jwt.sign(usuario, ACCESS_TOKEN_SECRET, { expiresIn: VALIDEZ })
      res.status(201).json(token);
    } else {
      console.log('Datos de usuario inválidos');
      res.status(401).send('Inicio de sesión incorrecto');
      res.send();
    }
  });
}

function signup(req, res) {
  let usuario = req.body;
  console.log(usuario);
  delay(1000).then(() => {
    if (userStorage.userExists(usuario)) {
      // res.status(401).send('El usuario ya existe');
      res.redirect(307, '/auth/login')
    } else {
      if (usuario && usuario.email && usuario.password) {
        const u = new Usuario(usuario);
        u.save((err, data) => {
          if (err) res.json({ error: err });
          else res.status(201).send('Usuario registrado: ' + usuario.email);
        });        
      }
    }
  });
}


// function verify (req, res) {
//   delay(1000).then(() => {
//     //si estoy aqui ya paso por el midddleware, luego no tengo que verificar nada
//     console.log(req.usuario);
//     res.status(201).json({
//       msg: 'Verified',
//       email: req.usuario
//     });
//   });
// }

const router = express.Router();


// --------------- AUTH API
router.post("/login", login);
router.post("/signup", signup);
router.get("/verify", verify);





module.exports = router;