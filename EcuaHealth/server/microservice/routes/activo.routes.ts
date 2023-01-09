import { Router } from "express";
import { activoById, Activos, deleteActivo, nuevoActivo, updateActivo } from "../controllers/activo.controller";

export const api = Router();

api.post('/registro', nuevoActivo);
api.get('/listado', Activos);
api.get('/:id', activoById);
api.patch('/update/:id', updateActivo);
api.delete('/delete/:id', deleteActivo);