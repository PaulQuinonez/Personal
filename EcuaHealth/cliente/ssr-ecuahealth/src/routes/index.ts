import {Router} from 'express';
import {indexController} from '../controllers/activo.controller'

const router : Router = Router();

// PAGINA DE ACTIVOS PRINCIPAL
router.get('/activo', indexController.index)

// ACTIVO NUEVO
router.get('/activo/nuevo', indexController.form)
router.post('/activo/nuevo', indexController.create)

// EDITAR ACTIVO
router.get('/activo/update/:id', indexController.formEdit)
router.post('/activo/update/:id', indexController.editar)


// ELIMINAR ACTIVO
router.get('/activo/delete/:id', indexController.eliminar)


export default router