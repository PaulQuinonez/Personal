const {Schema, model} = require ('mongoose')

//El esquema permite definir lo que vamos a guardar en mongoDB
const meetingSchema = new Schema({
    title: {type: String},
    description: {type: String},

}, {
    timestamps : true, //Permite que se guarde la fecha de creación y la ultima fecha de actualización
    versionKey: false //Con esto no mostramos el --v
})

module.exports = model('Meeting', meetingSchema)