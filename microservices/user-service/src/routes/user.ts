import { Router } from "express";

import { registrar, login, obtenerUser, obtenerUserPorId, actualizaruserPorId, eliminarUserPorId } from "../controllers/UserController";

const api = Router();

api.post('/registrar', registrar);
api.post('/login', login);
api.get('/', obtenerUser);
api.get('/ver/:id', obtenerUserPorId);
api.put('/editar/:id', actualizaruserPorId);
api.delete('/eliminar/:id', eliminarUserPorId);

export {api}