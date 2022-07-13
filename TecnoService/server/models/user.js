const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({

    nombres: String,
    apellidos: String,
    cedula: String,
    email: String,
    password: String,
    telefono: String,
    role: String

})

module.exports = mongoose.model('user', UserSchema);