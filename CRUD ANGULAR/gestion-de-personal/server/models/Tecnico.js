const mogoose = require('mongoose');

//CREAMOS EL MODELO QUE VAMOS A UTILIZAR PARA LA APLICACION
const TecnicoSchema = mogoose.Schema({

    nombre: String,
    email: String,
    foto: String,
    mobile: String,
    compania: String,
    titulo: String

})

//EXPORTAMOS EL MODELO CON MONGOOSE
module.exports = mogoose.model('Tecnicos', TecnicoSchema);