import { Router } from "express";
import {registrar, obtenerTarea, listarTarea, editarTarea,eliminarTarea} from '../controllers/TareaController'

const api = Router();

api.post('/registrar', registrar);
api.get('/ver/:id', obtenerTarea);
api.get('/listar/:titulo?', listarTarea);
api.put('/editar/:id', editarTarea);
api.delete('/eliminar/:id', eliminarTarea);

export {api}