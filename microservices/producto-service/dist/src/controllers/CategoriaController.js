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
exports.listarCategoria = exports.eliminarCategoria = exports.editarCategoria = exports.obtenerCategoria = exports.registrar = void 0;
const categoria_1 = require("../models/categoria");
const registrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body; //Aqui van todos los datos del formulario
    const categoria = new categoria_1.Categoria(data);
    const nuevaCategoria = yield categoria.save();
    if (nuevaCategoria) {
        res.status(200).send(nuevaCategoria);
    }
    else {
        res.status(500).send('Error al momento de registrar el cliente');
    }
});
exports.registrar = registrar;
const obtenerCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield categoria_1.Categoria.findById(id, (err, categoria_data) => {
        if (categoria_data) {
            res.status(200).send({ cliente: categoria_data });
        }
        else {
            res.status(403).send({ message: 'No existe el cliente en el sistema' });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.obtenerCategoria = obtenerCategoria;
const editarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const data = req.body;
    yield categoria_1.Categoria.findByIdAndUpdate(id, { titulo: data.titulo, descripcion: data.descripcion }, (err, categoria_edit) => {
        if (categoria_edit) {
            res.status(200).send({ cliente: categoria_edit });
        }
        else {
            res.status(500).send(err);
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.editarCategoria = editarCategoria;
const eliminarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield categoria_1.Categoria.findByIdAndRemove(id, (err, categoria_eliminado) => {
        if (categoria_eliminado) {
            res.status(200).send({ cliente: categoria_eliminado });
        }
        else {
            res.status(500).send(err);
        }
    });
});
exports.eliminarCategoria = eliminarCategoria;
const listarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield categoria_1.Categoria.find((err, categorias_data) => {
        if (categorias_data) {
            res.status(200).send({ categorias: categorias_data });
        }
        else {
            res.status(403).send({ message: 'No existe el cliente en el sistema' });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.listarCategoria = listarCategoria;
