const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VentaSchema = Schema({

    idcliente: { type: Schema.ObjectId, ref: 'cliente' }, //PERSONA QUE ESTA COMPRANDO
    iduser: { type: Schema.ObjectId, ref: 'user' }, //EMPLEADO QUE REALIZA LA VENTA
    fecha: { type: Date, default: Date.now } //FECHA DE LA VENTA

})

module.exports = mongoose.model('venta', VentaSchema);