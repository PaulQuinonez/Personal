import {Request, Response} from 'express'
import { ICliente } from '../interfaces/ICliente';
import { Cliente} from '../models/cliente';

const registrar = async (req : Request, res : Response) => {

    const data = req.body as ICliente;

    const cliente = new Cliente(data);
    const nuevoCliente = await cliente.save();

    if(nuevoCliente){

        res.status(200).send(nuevoCliente);

    }else{

        res.status(500).send('Error al momento de registrar el cliente');

    }

    

}

const listar = async (req : Request, res : Response) => {

    await Cliente.find((err, clientes_data) => {
        if (clientes_data) {
            res.status(200).send({ clientes: clientes_data })
        } else {
            res.status(403).send({ message: 'No existe el cliente en el sistema' })
        }
    }).clone().catch(function(err){ console.log(err)})

}

const obtenerCliente = async (req : Request, res : Response) => {

    const id = req.params['id'];

    await Cliente.findById(id, (err : Error , cliente_data : ICliente) => {
        if (cliente_data) {
            res.status(200).send({ cliente: cliente_data })
        }else{
            res.status(403).send({ message: 'No existe el cliente en el sistema' })
        }
    }).clone().catch(function(err){ console.log(err)})
}

const editarCliente = async (req : Request, res : Response) => {

    const id = req.params['id'];
    const data = req.body;

    await Cliente.findByIdAndUpdate(id, { nombres: data.nombres, cedula: data.cedula, correo: data.correo }, (err, cliente_edit) => {

        if (cliente_edit) {

            res.status(200).send({ cliente: cliente_edit });

        } else {

            res.status(500).send(err)

        }

    }).clone().catch(function(err){ console.log(err)})

}

const eliminarCliente = async (req : Request, res : Response) => {

    const id = req.params['id'];

    await Cliente.findByIdAndRemove(id, (err : Error, cliente_eliminado : ICliente) => {

        if (cliente_eliminado) {

            res.status(200).send({ cliente: cliente_eliminado });

        } else {

            res.status(500).send(err)

        }

    }).clone().catch(function(err){ console.log(err)})

}

export {

    registrar,
    editarCliente,
    obtenerCliente,
    listar,
    eliminarCliente

}