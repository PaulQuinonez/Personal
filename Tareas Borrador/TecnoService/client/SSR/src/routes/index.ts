import {Router} from 'express';
import {indexController} from '../controllers/reporte'

const router : Router = Router();

// PAGINA DE REPORTE PRINCIPAL
router.get('/reportes', indexController.index)

// REPORTE NUEVO
router.get('/reportes/nuevo', indexController.form)
router.post('/reportes/nuevo', indexController.create)

//VER REPORTE
router.get('/reportes/view/:id', indexController.view)

// ELIMINAR REPORTE
router.get('/reportes/eliminar/:id', indexController.eliminar)


export default router