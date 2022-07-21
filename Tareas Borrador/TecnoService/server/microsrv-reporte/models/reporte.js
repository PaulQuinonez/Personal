const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReporteSchema = Schema({

    asunto: String,
    descripcion: String,
    problema: String,
    fecha: { type: Date, default: Date.now } //FECHA DEL REPORTE

})

module.exports = mongoose.model('reporte', ReporteSchema);