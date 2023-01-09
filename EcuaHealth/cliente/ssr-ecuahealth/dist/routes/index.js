"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activo_controller_1 = require("../controllers/activo.controller");
const router = (0, express_1.Router)();
// PAGINA DE ACTIVOS PRINCIPAL
router.get('/activo', activo_controller_1.indexController.index);
// ACTIVO NUEVO
router.get('/activo/nuevo', activo_controller_1.indexController.form);
router.post('/activo/nuevo', activo_controller_1.indexController.create);
// EDITAR ACTIVO
router.get('/activo/update/:id', activo_controller_1.indexController.formEdit);
router.post('/activo/update/:id', activo_controller_1.indexController.editar);
// ELIMINAR ACTIVO
router.get('/activo/delete/:id', activo_controller_1.indexController.eliminar);
exports.default = router;
