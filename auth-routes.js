const { Usuario } = require("./models.js");
const express = require("express");
const jwt = require('jsonwebtoken');
const config = require('./config.js');

const refreshTokens = [];


const userStorage = require('./users-storage')({
  email: 'jose@gmail.com',
  password: 'jose'
});


function login(req, res) {
  let usuario = req.body;
  // console.log(usuario);
  if (userStorage.userExists(usuario)) {
    const token = jwt.sign({ email: usuario.email }, config.ACCESS_TOKEN_SECRET, { expiresIn: config.VALIDEZ })
    res.status(201).json(token); // Inicio de sesión correcto
  } else
    res.sendStatus(401); // Inicio de sesión incorrecto  
}

function signup(req, res) {
  let usuario = req.body;

  if (userStorage.userExists(usuario)) {
    res.sendStatus(401); // Ya hay un usuario registrado con este email
    // res.redirect(307, '/auth/login')
  } else {
    if (usuario && usuario.email && usuario.password) {
      const u = new Usuario(usuario);
      u.save((err, data) => {
        if (err) res.sendStatus(500);  // El usuario no pudo registrarse
        else res.sendStatus(201); // El usuario pudo registrarse
      });
    }
  }
}

function logout(req, res) {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204);
}



// --------------- AUTH API

const router = express.Router();


router.post("/login", login);
router.post("/signup", signup);
router.delete("/logout", logout);



module.exports = router;