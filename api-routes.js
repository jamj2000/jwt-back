const cors = require('cors')
const express = require("express");
const controller = require("./controllers.js");


const router = express.Router();



// --------------- API REST CRUD

router.get    ("/clientes",      cors(), controller.readClientes);   // Read All
router.get    ("/clientes/:id",  cors(), controller.readCliente);    // Read
router.delete ("/clientes/:id",  cors(), controller.deleteCliente);  // Delete
router.put    ("/clientes/:id",  cors(), controller.updateCliente);  // Update
router.post   ("/clientes",      cors(), controller.createCliente);  // Create

// --------------- API REST usuarios 
// Rutas para fines de depuración durante el desarrollo
router.get    ("/usuarios",      cors(), controller.readUsuarios);   // Read All
router.post   ("/usuarios",      cors(), controller.createUsuario);  // Create
router.delete ("/usuarios/:id",  cors(), controller.deleteUsuario);  // Delete

module.exports = router;



// const posts = [
//   {
//     username: 'Kyle',
//     title: 'Post 1'
//   },
//   {
//     username: 'Jim',
//     title: 'Post 2'
//   }
// ]

// app.get('/posts', authenticateToken, (req, res) => {
//   res.json(posts.filter(post => post.username === req.user.name))
// })

// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// var n = fruits.includes("Mango");
