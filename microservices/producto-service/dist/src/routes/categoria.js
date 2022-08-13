"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = require("express");
const CategoriaController_1 = require("../controllers/CategoriaController");
const api = (0, express_1.Router)();
exports.api = api;
api.post('/registrar', CategoriaController_1.registrar);
api.get('/ver/:id', CategoriaController_1.obtenerCategoria);
api.delete('/eliminar/:id', CategoriaController_1.eliminarCategoria);
api.put('/editar/:id', CategoriaController_1.editarCategoria);
api.get('/listado/', CategoriaController_1.listarCategoria);
