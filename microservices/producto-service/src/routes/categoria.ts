import { Router } from "express";
import {registrar, obtenerCategoria, editarCategoria, eliminarCategoria, listarCategoria} from '../controllers/CategoriaController'

const api = Router();

api.post('/registrar', registrar);
api.get('/ver/:id', obtenerCategoria);
api.delete('/eliminar/:id', eliminarCategoria);
api.put('/editar/:id', editarCategoria);
api.get('/listado/', listarCategoria)

export {api}