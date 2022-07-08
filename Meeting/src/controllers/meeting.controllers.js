const Meeting = require ('../models/Meeting')
const {connection} = require('../db')

//Añadimos una tarea a traves de esta función
const addMeeting = async (meeting) => {
   await Meeting.create(meeting); //Permite crear un nuevo objeto en mongdb guardando los datos que le pasemos
   console.log("Reunión guardada con éxito!");
   await connection.close() //Se acaba la conexion
}

//BUSCAR
const findMeeting = async (text) => {

    const buscar = new RegExp(text, "i"); //Sirve para buscar en un texto al inicio o final de la palabra
    const meetings = await Meeting.find({
        $or: [{title: buscar}, {description: buscar}] //Sirve para consultar a través de un arreglo definiendo lo que queremos buscar tanto en el titulo como en la descripcion
    })
    if(meetings.length === 0){
        console.log("No existe la reunión con este título o descripción");
        await connection.close();
        process.exit(0);
    }

    console.table(
        {
            _id: meetings[0]._id.toString(),
            title: meetings[0].title,
            description: meetings[0].description,
        }
    )
    await connection.close();
    process.exit(0);
}


//LISTAR
const listMeetings = async () => {

    const meetings = await Meeting.find().lean();
    console.table(meetings.map(meetings => ({
        _id: meetings._id.toString(),
        title: meetings.title,
        description: meetings.description,
    }))); //console.table permite mostrar por consola tablas
    
    await connection.close();
    process.exit(0)

}

//ACTUALIZAR
const updateMeeting = async (_id, newMeeting) => {
    await Meeting.updateOne({_id}, newMeeting) //Una vez recibido los campos esto lo actualiza
    console.log("Reunión actualizada");
    await connection.close();
}

//ELIMINAR
const deleteMeeting = async (_id) => {
    await Meeting.findByIdAndDelete(_id);
    console.log("Reunión eliminada");
    await connection.close();
}

module.exports = {
    addMeeting,
    findMeeting,
    listMeetings,
    deleteMeeting,
    updateMeeting
}