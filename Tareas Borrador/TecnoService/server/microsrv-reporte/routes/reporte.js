const express = require('express');
const ReporteController = require('../controllers/ReporteController');

const api = express.Router();

api.post('/registrar', ReporteController.registrar);
api.get('/ver/:id', ReporteController.obtenerReporte);
api.put('/editar/:id', ReporteController.editarReporte);
api.delete('/eliminar/:id', ReporteController.eliminarReporte);
api.get('/listado', ReporteController.listarReporte);

module.exports = api