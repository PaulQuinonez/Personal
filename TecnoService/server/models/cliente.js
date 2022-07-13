const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClienteSchema = Schema({

    nombres: String,
    cedula: String,
    correo: String,
    telefono: String,
    direccion: String,
    creatAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('cliente', ClienteSchema);