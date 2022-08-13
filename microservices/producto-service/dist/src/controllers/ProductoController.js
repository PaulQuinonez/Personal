"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerImagen = exports.act_stock = exports.eliminarProducto = exports.obtenerProducto = exports.editarProducto = exports.listarProducto = exports.registrar = void 0;
const producto_1 = require("../models/producto");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const registrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    //VALIDAMOS SI HAY UNA IMAGEN
    if (req.files) {
        const imagen_path = req.files.imagen.path;
        const name = imagen_path.split('\\'); //LA RUTA DE LA IMAGEN SE SEPARA POR SLASH INVERTIDO, POR LO CUAL ASI LO SEPARAMOS PARA OBTENER EL NOMBRE DE LA IMAGEN
        const imagen_name = name[2]; //EL INDICE 2 ES EL INDICE DONDE SE ENCUENTRA EL NOMBRE DE LA IMAGEN
        const producto = new producto_1.Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen_name;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;
        producto.save((err, producto_save) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            }
            else {
                if (producto_save) {
                    res.status(200).send({ producto: producto_save });
                }
                else {
                    res.status(403).send({ message: 'El producto no se registró' });
                }
            }
        });
    }
    else {
        const producto = new producto_1.Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = '';
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;
        const productoNuevo = producto.save((err, producto_save) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            }
            else {
                if (producto_save) {
                    res.status(200).send({ producto: productoNuevo });
                }
                else {
                    res.status(403).send({ message: 'El producto no se registró' });
                }
            }
        });
    }
});
exports.registrar = registrar;
function listarProducto(req, res) {
    const titulo = req.params['titulo'];
    producto_1.Producto.find({ titulo: new RegExp(titulo, 'i') }, (err, producto_listado) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            if (producto_listado) {
                res.status(200).send({ productos: producto_listado });
            }
            else {
                res.status(403).send({ message: 'No existe un producto con ese título' });
            }
        }
    });
}
exports.listarProducto = listarProducto;
const editarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params['id'];
    const img = req.params['img']; //OBTENEMOS LA IMAGEN
    if (req.files.imagen) {
        if (img || img != null || img != undefined) {
            fs_1.default.unlink('./uploads/productos/' + img, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
        const imagen_path = req.files.imagen.path;
        const name = imagen_path.split('\\');
        const imagen_name = name[2];
        yield producto_1.Producto.findByIdAndUpdate({ _id: id }, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: imagen_name,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            idcategoria: data.idcategoria,
            puntos: data.puntos
        }, (err, producto_edit) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            }
            else {
                if (producto_edit) {
                    res.status(200).send({ productos: producto_edit });
                }
                else {
                    res.status(403).send({ message: 'No pudo editar el producto' });
                }
            }
        }).clone().catch(function (err) { console.log(err); });
    }
    else {
        yield producto_1.Producto.findByIdAndUpdate({ _id: id }, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            idcategoria: data.idcategoria,
            puntos: data.puntos
        }, (err, producto_edit) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            }
            else {
                if (producto_edit) {
                    res.status(200).send({ productos: producto_edit });
                }
                else {
                    res.status(403).send({ message: 'No pudo editar el producto' });
                }
            }
        }).clone().catch(function (err) { console.log(err); });
    }
});
exports.editarProducto = editarProducto;
const obtenerProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield producto_1.Producto.findOne({ _id: id }, (err, producto_data) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }
        else {
            if (producto_data) {
                res.status(200).send({ producto: producto_data });
            }
            else {
                res.status(403).send({ message: 'No existe el producto' });
            }
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.obtenerProducto = obtenerProducto;
function eliminarProducto(req, res) {
    const id = req.params['id'];
    producto_1.Producto.findByIdAndRemove({ _id: id }, (err, producto_eliminado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }
        else {
            if (producto_eliminado) {
                fs_1.default.unlink('./uploads/productos/' + producto_eliminado.imagen, (err) => {
                    if (err) {
                        res.status(500).send({ message: 'Error del servidor', err });
                    }
                });
                res.status(200).send({ producto: producto_eliminado });
            }
            else {
                res.status(403).send({ message: 'El producto no se pudo eliminar' });
            }
        }
    }).clone().catch(function (err) { console.log(err); });
}
exports.eliminarProducto = eliminarProducto;
const act_stock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const data = req.body;
    yield producto_1.Producto.findById(id, (err, producto_data) => {
        if (producto_data) {
            producto_1.Producto.findByIdAndUpdate(id, { stock: parseInt(producto_data.stock) + parseInt(data.stock) }, (err, producto_edit) => {
                if (producto_edit) {
                    res.status(200).send({ producto: producto_edit });
                }
                else {
                    res.status(500).send(err);
                }
            });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.act_stock = act_stock;
const obtenerImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const img = req.params['img']; //LE DECIMOS QUE BUSQUE LA IMAGEN
    if (img != "null") {
        const path_img = './uploads/productos/' + img;
        res.status(200).sendFile(path_1.default.resolve(path_img));
    }
    else {
        const path_img = './uploads/productos/default.png';
        res.status(200).sendFile(path_1.default.resolve(path_img));
    }
});
exports.obtenerImagen = obtenerImagen;
