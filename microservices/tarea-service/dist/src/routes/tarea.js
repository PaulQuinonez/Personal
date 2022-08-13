"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = require("express");
const TareaController_1 = require("../controllers/TareaController");
const api = (0, express_1.Router)();
exports.api = api;
api.post('/registrar', TareaController_1.registrar);
api.get('/ver/:id', TareaController_1.obtenerTarea);
api.get('/listar/:titulo?', TareaController_1.listarTarea);
api.put('/editar/:id', TareaController_1.editarTarea);
api.delete('/eliminar/:id', TareaController_1.eliminarTarea);