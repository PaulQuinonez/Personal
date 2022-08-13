import { Router } from "express";

import {registrarVenta, obtenerVenta, obtenerVentas, editarDetalleVenta, detalleVenta, eliminarVenta} from '../controllers/VentaController'

const api = Router();

api.post('/nuevaVenta', registrarVenta)
api.get('/obtenerVenta/:id', obtenerVenta)
api.get('/listado', obtenerVentas)
api.put('/editar/:id', editarDetalleVenta)
api.get('/detalle/:id', detalleVenta)
api.delete('/eliminar/:id', eliminarVenta)

export {api}