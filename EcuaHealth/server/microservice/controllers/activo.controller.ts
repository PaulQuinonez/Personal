import { Request, Response } from "express";
import { IActivo } from "../interfaces/activo.interface";
import { Activo } from "../models/activo.model";

export const nuevoActivo = async (req: Request, res: Response) => {
    
    const data = req.body as IActivo;

    const activo = new Activo();

    //PROP ACTIVO
    activo.activoT = data.activoT;
    //PROP ACTIVO
    
    activo.save((err, activo_new) => {

        if(activo_new){
            res.status(200).send({
                message: 'Activo creado con éxito!',
                activo: activo_new
            })
        } else {
            res.status(403).send({
                message: 'El activo no pudo registrarse!',
                error: err
            })
        }

    })

}

export const Activos = async (req: Request, res: Response) => {
    
    await Activo.find((err, activo_data) => {

        if(activo_data){
            res.status(200).send({
                activo: activo_data
            })
        } else {
            res.status(403).send({
                message: 'No hay activos creados!',
                error: err
            })
        }

    }).clone().catch(function(err){ console.log(err)})

}

export const activoById = async (req: Request, res: Response) => {
    
    const id = req.params['id'];

    await Activo.findById(id, (err : Error, activo_data : IActivo) => {

        if(activo_data){
            res.status(200).send({
                message: 'El activo encontrado es: ',
                activo: activo_data
            })
        } else {
            res.status(403).send({
                message: 'El activo no existe, registrelo por favor',
                error: err
            })
        }

    }).clone().catch(function(err){ console.log(err)})

}

export const updateActivo = async (req: Request, res: Response) => {
    
    const id = req.params['id'];
    const data = req.body

    await Activo.findByIdAndUpdate(id, {

        //PROP ACTIVO
        activoT : data.activoT
        //PROP ACTIVO

    }, (err : Error, activo_update) => {

        if(activo_update){
            res.status(200).send({
                message: 'Activo actualizado con éxito!',
                activo: activo_update
            })
        } else {
            res.status(403).send({
                message: 'El activo no pudo actualizarse',
                error: err
            })
        }

    }).clone().catch(function(err){ console.log(err)})

}

export const deleteActivo = async (req: Request, res: Response) => {
    
    const id = req.params['id'];

    await Activo.findByIdAndRemove(id, (err : Error, activo_deleted : IActivo) => {

        if(activo_deleted){
            res.status(200).send({
                message: 'El activo eliminado es: ',
                activo: activo_deleted
            })
        } else {
            res.status(403).send({
                message: 'El activo no se pudo eliminar',
                error: err
            })
        }

    }).clone().catch(function(err){ console.log(err)})

}