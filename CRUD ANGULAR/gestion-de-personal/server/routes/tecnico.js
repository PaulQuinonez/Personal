const express = require('express')
const tecnicoController = require('../controllers/tecnicoController')

const app = express.Router();

//RUTA PARA GESTIONAR CRUD DE TECNICO
app.post('/agregar', tecnicoController.agregarTecnico);
app.get('/', tecnicoController.obtenerTecnico);
app.get('/ver/:id', tecnicoController.obtenerTecnicoPorId);
app.put('/editar/:id', tecnicoController.actualizarTecnicoPorId);
app.delete('/eliminar/:id', tecnicoController.eliminarTecnicoPorId);

module.exports = app;