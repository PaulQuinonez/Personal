const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TareaSchema = Schema({

    titulo: String,
    descripcion: String,
    problema: String,
    iduser: { type: Schema.ObjectId, ref: 'user' },
    idcliente: { type: Schema.ObjectId, ref: 'cliente' }

})

module.exports = mongoose.model('tarea', TareaSchema);