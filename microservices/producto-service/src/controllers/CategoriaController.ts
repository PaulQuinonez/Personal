import {Request, Response} from 'express'
import { ICategoria } from '../interfaces/ICategoria'
import { Categoria } from '../models/categoria'

const registrar = async (req:Request, res:Response) => {

    const data = req.body; //Aqui van todos los datos del formulario

    const categoria = new Categoria(data);
    const nuevaCategoria = await categoria.save();

    if(nuevaCategoria){

        res.status(200).send(nuevaCategoria);

    }else{

        res.status(500).send('Error al momento de registrar el cliente');

    }
    
}

const obtenerCategoria =async (req:Request, res:Response) => {

    const id = req.params['id'];

    await Categoria.findById(id, (err : Error , categoria_data : ICategoria) => {
        if (categoria_data) {
            res.status(200).send({ cliente: categoria_data })
        }else{
            res.status(403).send({ message: 'No existe el cliente en el sistema' })
        }
    }).clone().catch(function(err){ console.log(err)})
    
}

const editarCategoria =async (req:Request, res:Response) => {

    const id = req.params['id'];
    const data = req.body;

    await Categoria.findByIdAndUpdate(id, { titulo: data.titulo, descripcion: data.descripcion }, (err, categoria_edit) => {

        if (categoria_edit) {

            res.status(200).send({ cliente: categoria_edit });

        } else {

            res.status(500).send(err)

        }

    }).clone().catch(function(err){ console.log(err)})
    
}

const eliminarCategoria =async (req:Request, res:Response) => {

    const id = req.params['id'];

    await Categoria.findByIdAndRemove(id, (err : Error, categoria_eliminado : ICategoria) => {

        if (categoria_eliminado) {

            res.status(200).send({ cliente: categoria_eliminado });

        } else {

            res.status(500).send(err)

        }

    })
    
}

const listarCategoria =async (req:Request, res:Response) => {

    await Categoria.find((err, categorias_data) => {
        if (categorias_data) {
            res.status(200).send({ categorias: categorias_data })
        } else {
            res.status(403).send({ message: 'No existe el cliente en el sistema' })
        }
    }).clone().catch(function(err){ console.log(err)})
    
}

export {

    registrar,
    obtenerCategoria,
    editarCategoria,
    eliminarCategoria,
    listarCategoria

}