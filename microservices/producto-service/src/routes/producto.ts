import {Router} from "express"
import {registrar, listarProducto, editarProducto, obtenerProducto, eliminarProducto, act_stock, obtenerImagen} from "../controllers/ProductoController"
const multipart = require('connect-multiparty')

const path = multipart({uploadDir: './uploads/productos'}) // RUTA PARA GUARDAR IMAGENES

const api = Router();

api.post('/registrar', path, registrar);
api.get('/listado/:titulo?', listarProducto);
api.put('/editar/:id/:img?', path, editarProducto);
api.get('/ver/:id', obtenerProducto);
api.delete('/eliminar/:id', eliminarProducto);
api.put('/actualizar/stock/:id', act_stock);
api.get('/obtenerImg/:img', obtenerImagen);

export {
    api
}