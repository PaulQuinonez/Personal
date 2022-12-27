import { Router } from "express";
import { createReceta, findAllRecetas, FindByIdReceta, patchReceta, removeReceta } from "../controllers/receta-especial.controller";

export const api = Router();

api.post('/registrar', createReceta);
api.get('/lista', findAllRecetas);
api.get('/receta/:id', FindByIdReceta);
api.patch('/recetaUpdate/:id', patchReceta);
api.delete('/recetaRemove/:id', removeReceta);