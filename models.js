const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente',
  new mongoose.Schema({ 
    nombre: String, 
    apellidos: String })
);

const Articulo = mongoose.model('Articulo',
  new mongoose.Schema({ nombre: String, precio: Number })
);


const Usuario = mongoose.model('Usuario',
  new mongoose.Schema({ 
    email: { type: String, required: true, lowercase: true,
             unique: true, index:true, trim: true }, 
    password: { type: String, required: true } 
  })
);

// Ejecutar en MongoDB
//   db.usuarios.createIndex({"email": 1}, {unique: true})
// En caso de desear crear un índice compuesto en la BD.
//   db.usuarios.createIndex({"email": 1, "password": 1}, {unique: true})



// ---------
module.exports = {
  Cliente,
  Articulo,
  Usuario
}