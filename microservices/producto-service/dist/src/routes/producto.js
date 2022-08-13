"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = require("express");
const ProductoController_1 = require("../controllers/ProductoController");
const multipart = require('connect-multiparty');
const path = multipart({ uploadDir: './uploads/productos' }); // RUTA PARA GUARDAR IMAGENES
const api = (0, express_1.Router)();
exports.api = api;
api.post('/registrar', path, ProductoController_1.registrar);
api.get('/listado/:titulo?', ProductoController_1.listarProducto);
api.put('/editar/:id/:img', path, ProductoController_1.editarProducto);
api.get('/ver/:id', ProductoController_1.obtenerProducto);
api.delete('/eliminar/:id', ProductoController_1.eliminarProducto);
api.put('/actualizar/stock/:id', ProductoController_1.act_stock);
api.get('/obtenerImg/:img', ProductoController_1.obtenerImagen);
