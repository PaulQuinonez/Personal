const Tecnico = require("../models/Tecnico");

//CREAMOS LOS CONTROLADORES QUE NOS AYUDARAN EN EL CRUD

//AGREGAR TECNICO
async function agregarTecnico (req, res){

    try {
        
        let tecnico;

        tecnico = new Tecnico(req.body); //Instanciamos la clase tecnico, que recibira el req.body

        const tecnico_save = await tecnico.save(); //Guardamos los datos

        res.send(tecnico_save); //Mostramos los datos


    } catch (error) {
        console.log(error);
        res.status(500).send('Hay un problema')
    }

}

//OBTENER TECNICOS
async function obtenerTecnico (req, res){

    try {
        
        const tecnico = await Tecnico.find();
        res.status(200).send(tecnico);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hay un problema')
    }

}

//OBTENER TECNICO POR ID
async function obtenerTecnicoPorId (req, res){

    try {

        const id = req.params['id']
        
        Tecnico.findById(id,(err, tecnico_data) => {

            if(tecnico_data){

                res.status(200).send(tecnico_data)
            } else{

                res.status(400).send({message: 'No existe el técnico'})

            }

        })


    } catch (error) {
        console.log(error);
        res.status(500).send('Hay un problema')
    }

}

//ACTUALIZAR TECNICO
async function actualizarTecnicoPorId (req, res){

    try {

        const id = req.params['id'];
        const data = req.body;
        
        Tecnico.findByIdAndUpdate(id, data, (err, tecnico_data) => {

            if(tecnico_data){

                res.status(200).send({message: 'Técnico actualizado', data_act: tecnico_data})
            } else{

                res.status(400).send({message: 'No existe el técnico'})

            }

        })


    } catch (error) {
        console.log(error);
        res.status(500).send('Hay un problema')
    }

}

//ELIMINAR TECNICO
async function eliminarTecnicoPorId (req, res){

    try {

        const id = req.params['id'];
        const tecnicoEliminado = await Tecnico.findByIdAndDelete(id, {new: true});
        res.status(200).send({message: 'Tecnico eliminado con éxito', data: tecnicoEliminado})


    } catch (error) {
        console.log(error);
        res.status(500).send('Hay un problema')
    }

}

module.exports = {

    agregarTecnico,
    obtenerTecnico,
    obtenerTecnicoPorId,
    actualizarTecnicoPorId,
    eliminarTecnicoPorId

}