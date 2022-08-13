import {Request, Response} from 'express'

import { ITarea } from '../interfaces/ITarea';
import { Tarea} from '../models/tarea';

function registrar(req : Request, res : Response){

    const data = req.body

    const tarea = new Tarea();

    tarea.titulo = data.titulo;
    tarea.descripcion = data.descripcion;
    tarea.iduser = data.iduser;
    tarea.idcliente = data.idcliente;

    tarea.save((err, tarea_save) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' })

        } else {

            if (tarea_save) {
                
                console.log(tarea_save);
                
                res.status(200).send({ tarea: tarea_save })

            } else {

                res.status(403).send({ message: 'La tarea no se pudo registrar' })

            }

        }

    })

}

const obtenerTarea = async (req : Request, res : Response) => {

    const id = req.params['id'];

    await Tarea.findById({ _id: id }, (err : Error, tarea_data : any) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (tarea_data) {
                res.status(200).send({ tarea: tarea_data })
            } else {
                res.status(500).send({ message: 'La tarea no existe' })
            }
        }

    }).clone().catch(function(err){ console.log(err)})

}

const listarTarea = async (req : Request, res : Response) => {

    const titulo = req.params['titulo'];

    await Tarea.find({ titulo: new RegExp(titulo, 'i') },(err : Error, tarea_listado : any) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (tarea_listado) {
                res.status(200).send({ tareas: tarea_listado })
            } else {
                res.status(403).send({ message: 'No hay tareas con ese título' })
            }
        }
    }).clone().catch(function(err){ console.log(err)})

}

const editarTarea = async (req : Request, res : Response) => {

    const id = req.params['id'];

    const data = req.body;

    await Tarea.findByIdAndUpdate({ _id: id }, data, (err : Error, tarea_edit : any) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (tarea_edit) {
                res.status(200).send({ tarea: tarea_edit })
            } else {
                res.status(403).send({ message: 'La tarea no se pudo actualizar' })
            }
        }
    }).clone().catch(function(err){ console.log(err)})

}

const eliminarTarea = async (req : Request, res : Response) => {

    const id = req.params['id'];

    await Tarea.findByIdAndRemove({ _id: id }, (err : Error, tarea_eliminada : any) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (tarea_eliminada) {
                res.status(200).send({ tarea: tarea_eliminada })
            } else {
                res.status(403).send({ message: 'La tarea no se pudo eliminar' })
            }
        }
    })

}

export {

    registrar,
    obtenerTarea,
    listarTarea,
    editarTarea,
    eliminarTarea

}
