const Producto = require('../models/producto');
const fs = require('fs') //FILE SYSTEM
const path = require('path');

function registrar(req, res) {

    const data = req.body

    //VALIDAMOS SI HAY UNA IMAGEN

    if (req.files) {
        const imagen_path = req.files.imagen.path;
        const name = imagen_path.split('\\'); //LA RUTA DE LA IMAGEN SE SEPARA POR SLASH INVERTIDO, POR LO CUAL ASI LO SEPARAMOS PARA OBTENER EL NOMBRE DE LA IMAGEN
        const imagen_name = name[2]; //EL INDICE 2 ES EL INDICE DONDE SE ENCUENTRA EL NOMBRE DE LA IMAGEN

        const producto = new Producto();

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

                res.status(500).send({ message: 'Error en el servidor' })

            } else {
                if (producto_save) {

                    res.status(200).send({ producto: producto_save })

                } else {
                    res.status(403).send({ message: 'El producto no se registró' })
                }
            }

        })
    } else {

        const producto = new Producto();

        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = null; //EN CASO DE QUE NO SE REGISTRE UNA IMAGEN
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err, producto_save) => {

            if (err) {

                res.status(500).send({ message: 'Error en el servidor' })

            } else {
                if (producto_save) {

                    res.status(200).send({ producto: producto_save })

                } else {
                    res.status(403).send({ message: 'El producto no se registró' })
                }
            }

        })

    }

}

function listarProducto(req, res) {

    const titulo = req.params['titulo'];

    Producto.find({ titulo: new RegExp(titulo, 'i') }).populate('idcategoria').exec((err, producto_listado) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' });

        } else {

            if (producto_listado) {

                res.status(200).send({ productos: producto_listado })

            } else {

                res.status(403).send({ message: 'No existe un producto con ese título' });

            }

        }

    });

}

function editarProducto(req, res) {

    const data = req.body;
    const id = req.params['id']
    const img = req.params['img'] //OBTENEMOS LA IMAGEN

    if (req.files.imagen) {

        if (img || img != null || img != undefined) {
            fs.unlink('./uploads/productos/' + img, (err) => {
                if (err) {
                    throw err;
                }
            });
        }

        const imagen_path = req.files.imagen.path;
        const name = imagen_path.split('\\');
        const imagen_name = name[2];

        Producto.findByIdAndUpdate({ _id: id }, {
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

            } else {

                if (producto_edit) {

                    res.status(200).send({ productos: producto_edit })

                } else {

                    res.status(403).send({ message: 'No pudo editar el producto' });

                }

            }

        })

    } else {

        Producto.findByIdAndUpdate({ _id: id }, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            idcategoria: data.idcategoria,
            puntos: data.puntos
        }, (err, producto_edit) => {

            if (err) {

                res.status(500).send({ message: 'Error en el servidor' });

            } else {

                if (producto_edit) {

                    res.status(200).send({ productos: producto_edit })

                } else {

                    res.status(403).send({ message: 'No pudo editar el producto' });

                }

            }

        })

    }


}

function obtenerProducto(req, res) {

    const id = req.params['id'];

    Producto.findOne({ _id: id }, (err, producto_data) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' });

        } else {

            if (producto_data) {

                res.status(200).send({ producto: producto_data })

            } else {

                res.status(403).send({ message: 'No existe el producto' });

            }

        }

    })

}

function eliminarProducto(req, res) {

    const id = req.params['id'];

    Producto.findByIdAndRemove({ _id: id }, (err, producto_eliminado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (producto_eliminado) {
                fs.unlink('./uploads/productos/' + producto_eliminado.imagen, (err) => {
                    if (err) {
                        throw err;
                    }
                });
                res.status(200).send({ producto: producto_eliminado })
            } else {
                res.status(403).send({ message: 'El producto no se pudo eliminar' })
            }
        }
    })

}

function act_stock(req, res) {

    const id = req.params['id'];
    const data = req.body;

    Producto.findById(id, (err, producto_data) => {

        if (producto_data) {

            Producto.findByIdAndUpdate(id, { stock: parseInt(producto_data.stock) + parseInt(data.stock) }, (err, producto_edit) => {

                if (producto_edit) {

                    res.status(200).send({ producto: producto_edit });

                } else {
                    res.status(500).send(err)
                }

            })

        }

    })

}

function obtenerImagen(req, res) {

    const img = req.params['img']; //LE DECIMOS QUE BUSQUE LA IMAGEN

    if (img != "null") {

        const path_img = './uploads/productos/' + img;
        res.status(200).sendFile(path.resolve(path_img));

    } else {

        const path_img = './uploads/productos/default.png';
        res.status(200).sendFile(path.resolve(path_img));

    }

}

module.exports = {

    registrar,
    listarProducto,
    editarProducto,
    obtenerProducto,
    eliminarProducto,
    act_stock,
    obtenerImagen

}