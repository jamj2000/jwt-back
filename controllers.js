const { Cliente, Usuario } = require("./models.js");

// ------- USUARIOS

exports.readUsuarios = (req, res) => {
    Usuario.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
}

exports.createUsuario = (req, res) => {
    const usuario = new Usuario({ email: req.body.email, password: req.body.password });
    usuario.save((err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
}

exports.deleteUsuario = (req, res) => {
    Usuario.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
}
// ------- CLIENTES

exports.readClientes = (req, res) => {
    Cliente.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
}

exports.readCliente = (req, res) => {
    Cliente.findOne({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
}

exports.deleteCliente = (req, res) => {
    Cliente.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
}

exports.updateCliente = (req, res) => {
    Cliente.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { nombre: req.body.nombre, apellidos: req.body.apellidos } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        }
    );
}

exports.createCliente = (req, res) => {
    const cliente = new Cliente({ nombre: req.body.nombre, apellidos: req.body.apellidos });
    cliente.save((err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
}


