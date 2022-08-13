"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCliente = exports.listar = exports.obtenerCliente = exports.editarCliente = exports.registrar = void 0;
const cliente_1 = require("../models/cliente");
const registrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const cliente = new cliente_1.Cliente(data);
    const nuevoCliente = yield cliente.save();
    if (nuevoCliente) {
        res.status(200).send(nuevoCliente);
    }
    else {
        res.status(500).send('Error al momento de registrar el cliente');
    }
});
exports.registrar = registrar;
const listar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cliente_1.Cliente.find((err, clientes_data) => {
        if (clientes_data) {
            res.status(200).send({ clientes: clientes_data });
        }
        else {
            res.status(403).send({ message: 'No existe el cliente en el sistema' });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.listar = listar;
const obtenerCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield cliente_1.Cliente.findById(id, (err, cliente_data) => {
        if (cliente_data) {
            res.status(200).send({ cliente: cliente_data });
        }
        else {
            res.status(403).send({ message: 'No existe el cliente en el sistema' });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.obtenerCliente = obtenerCliente;
const editarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const data = req.body;
    yield cliente_1.Cliente.findByIdAndUpdate(id, { nombres: data.nombres, cedula: data.cedula, correo: data.correo }, (err, cliente_edit) => {
        if (cliente_edit) {
            res.status(200).send({ cliente: cliente_edit });
        }
        else {
            res.status(500).send(err);
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.editarCliente = editarCliente;
const eliminarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield cliente_1.Cliente.findByIdAndRemove(id, (err, cliente_eliminado) => {
        if (cliente_eliminado) {
            res.status(200).send({ cliente: cliente_eliminado });
        }
        else {
            res.status(500).send(err);
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.eliminarCliente = eliminarCliente;
