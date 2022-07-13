const Cliente = require('../models/cliente');

function registrar(req, res) {

    const data = req.body;

    const cliente = new Cliente();

    cliente.nombres = data.nombres;
    cliente.cedula = data.cedula
    cliente.correo = data.correo;
    cliente.telefono = data.telefono;
    cliente.direccion = data.direccion;

    cliente.save((err, cliente_save) => {

        if (cliente_save) {

            res.status(200).send({ cliente: cliente_save });

        } else {

            res.status(500).send(err)

        }

    });

}

function listar(req, res) {
    Cliente.find((err, clientes_data) => {
        if (clientes_data) {
            res.status(200).send({ clientes: clientes_data })
        } else {
            res.status(403).send({ message: 'No existe el cliente en el sistema' })
        }
    })
}

function obtenerCliente(req, res) {
    const id = req.params['id'];

    Cliente.findById(id, (err, cliente_data) => {
        if (cliente_data) {
            res.status(200).send({ cliente: cliente_data })
        }
    })
}

function editarCliente(req, res) {

    const id = req.params['id'];
    const data = req.body;

    Cliente.findByIdAndUpdate(id, {
        nombres: data.nombres,
        cedula: data.cedula,
        correo: data.correo,
        telefono: data.telefono,
        direccion: data.direccion,
    }, (err, cliente_edit) => {

        if (cliente_edit) {

            res.status(200).send({ cliente: cliente_edit });

        } else {

            res.status(500).send(err)

        }

    })

}

function eliminarCliente(req, res) {

    const id = req.params['id'];

    Cliente.findByIdAndRemove(id, (err, cliente_eliminado) => {

        if (cliente_eliminado) {

            res.status(200).send({ cliente: cliente_eliminado });

        } else {

            res.status(500).send(err)

        }

    })

}

module.exports = {

    registrar,
    editarCliente,
    obtenerCliente,
    listar,
    eliminarCliente

}