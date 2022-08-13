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
exports.eliminarTarea = exports.editarTarea = exports.listarTarea = exports.obtenerTarea = exports.registrar = void 0;
const tarea_1 = require("../models/tarea");
function registrar(req, res) {
    const data = req.body;
    const tarea = new tarea_1.Tarea();
    tarea.titulo = data.titulo;
    tarea.descripcion = data.descripcion;
    tarea.iduser = data.iduser;
    tarea.idcliente = data.idcliente;
    tarea.save((err, tarea_save) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }
        else {
            if (tarea_save) {
                console.log(tarea_save);
                res.status(200).send({ tarea: tarea_save });
            }
            else {
                res.status(403).send({ message: 'La tarea no se pudo registrar' });
            }
        }
    });
}
exports.registrar = registrar;
const obtenerTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield tarea_1.Tarea.findById({ _id: id }, (err, tarea_data) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }
        else {
            if (tarea_data) {
                res.status(200).send({ tarea: tarea_data });
            }
            else {
                res.status(500).send({ message: 'La tarea no existe' });
            }
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.obtenerTarea = obtenerTarea;
const listarTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const titulo = req.params['titulo'];
    yield tarea_1.Tarea.find({ titulo: new RegExp(titulo, 'i') }, (err, tarea_listado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }
        else {
            if (tarea_listado) {
                res.status(200).send({ tareas: tarea_listado });
            }
            else {
                res.status(403).send({ message: 'No hay tareas con ese título' });
            }
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.listarTarea = listarTarea;
const editarTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const data = req.body;
    yield tarea_1.Tarea.findByIdAndUpdate({ _id: id }, data, (err, tarea_edit) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }
        else {
            if (tarea_edit) {
                res.status(200).send({ tarea: tarea_edit });
            }
            else {
                res.status(403).send({ message: 'La tarea no se pudo actualizar' });
            }
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.editarTarea = editarTarea;
const eliminarTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield tarea_1.Tarea.findByIdAndRemove({ _id: id }, (err, tarea_eliminada) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }
        else {
            if (tarea_eliminada) {
                res.status(200).send({ tarea: tarea_eliminada });
            }
            else {
                res.status(403).send({ message: 'La tarea no se pudo eliminar' });
            }
        }
    });
});
exports.eliminarTarea = eliminarTarea;
