const express = require('express');
const userController = require('../controllers/UserController');

const api = express.Router();

api.post('/registrar', userController.registrar);
api.post('/login', userController.login);
api.get('/listado/:nombres?', userController.listarUser);
api.put('/editar/:id', userController.actualizarUser);
api.get('/ver/:id', userController.obtenerUser);
api.get('/rol/:role', userController.obtenerUserRol);
api.delete('/eliminar/:id', userController.eliminarUser);

module.exports = api