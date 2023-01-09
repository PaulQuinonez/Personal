"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = require("express");
const activo_controller_1 = require("../controllers/activo.controller");
exports.api = (0, express_1.Router)();
exports.api.post('/registro', activo_controller_1.nuevoActivo);
exports.api.get('/listado', activo_controller_1.Activos);
exports.api.get('/:id', activo_controller_1.activoById);
exports.api.patch('/update/:id', activo_controller_1.updateActivo);
exports.api.delete('/delete/:id', activo_controller_1.deleteActivo);
