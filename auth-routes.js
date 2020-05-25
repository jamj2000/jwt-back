const { Usuario } = require("./models.js");
const express = require("express");
const delay = require('delay');
const jwt = require('jsonwebtoken');
const config = require('./config.js');

const refreshTokens = [];

const userStorage = require('./security/users-storage')({
  email: 'jose@gmail.com',
  password: 'jose'
});


function login(req, res) {
  let usuario = req.body;
  console.log(usuario);
  delay(1000).then(() => {
    if (userStorage.userExists(usuario)) {
      console.log('Datos de usuario válidos');
      const token = jwt.sign(usuario, config.ACCESS_TOKEN_SECRET, { expiresIn: config.VALIDEZ })
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
        userStorage.register(usuario);       
      }
    }
  });
}

function logout (req, res)  {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
}

const router = express.Router();


// --------------- AUTH API
router.post("/login", login);
router.post("/signup", signup);
router.delete("/logout", logout);






module.exports = router;