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
exports.deleteActivo = exports.updateActivo = exports.activoById = exports.Activos = exports.nuevoActivo = void 0;
const activo_model_1 = require("../models/activo.model");
const nuevoActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const activo = new activo_model_1.Activo();
    //PROP ACTIVO
    activo.activoT = data.activoT;
    //PROP ACTIVO
    activo.save((err, activo_new) => {
        if (activo_new) {
            res.status(200).send({
                message: 'Activo creado con éxito!',
                activo: activo_new
            });
        }
        else {
            res.status(403).send({
                message: 'El activo no pudo registrarse!',
                error: err
            });
        }
    });
});
exports.nuevoActivo = nuevoActivo;
const Activos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield activo_model_1.Activo.find((err, activo_data) => {
        if (activo_data) {
            res.status(200).send({
                activo: activo_data
            });
        }
        else {
            res.status(403).send({
                message: 'No hay activos creados!',
                error: err
            });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.Activos = Activos;
const activoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield activo_model_1.Activo.findById(id, (err, activo_data) => {
        if (activo_data) {
            res.status(200).send({
                message: 'El activo encontrado es: ',
                activo: activo_data
            });
        }
        else {
            res.status(403).send({
                message: 'El activo no existe, registrelo por favor',
                error: err
            });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.activoById = activoById;
const updateActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const data = req.body;
    yield activo_model_1.Activo.findByIdAndUpdate(id, {
        //PROP ACTIVO
        activoT: data.activoT
        //PROP ACTIVO
    }, (err, activo_update) => {
        if (activo_update) {
            res.status(200).send({
                message: 'Activo actualizado con éxito!',
                activo: activo_update
            });
        }
        else {
            res.status(403).send({
                message: 'El activo no pudo actualizarse',
                error: err
            });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.updateActivo = updateActivo;
const deleteActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield activo_model_1.Activo.findByIdAndRemove(id, (err, activo_deleted) => {
        if (activo_deleted) {
            res.status(200).send({
                message: 'El activo eliminado es: ',
                activo: activo_deleted
            });
        }
        else {
            res.status(403).send({
                message: 'El activo no se pudo eliminar',
                error: err
            });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.deleteActivo = deleteActivo;
