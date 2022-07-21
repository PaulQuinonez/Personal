const express = require('express');
const TareaController = require('../controllers/TareaController');

const api = express.Router();

api.post('/registrar', TareaController.registrar);
api.get('/ver/:id', TareaController.obtenerTarea);
api.get('/ver/user/:id', TareaController.obtenerTareaUser);
api.get('/listar/:id/:titulo?', TareaController.listarTareaUser);
api.get('/listarAdmin/:titulo?', TareaController.listarTareaAdmin);
api.put('/editar/:id', TareaController.editarTarea);
api.delete('/eliminar/:id', TareaController.eliminarTarea);

module.exports = api