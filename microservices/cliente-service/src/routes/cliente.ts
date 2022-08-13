import { Router } from "express";
import {registrar, listar, obtenerCliente, editarCliente, eliminarCliente} from '../controllers/ClienteController'

const api = Router();

api.post('/registrar', registrar);
api.get('/listar/', listar);
api.get('/ver/:id', obtenerCliente);
api.put('/editar/:id', editarCliente);
api.delete('/eliminar/:id', eliminarCliente);

export {api}