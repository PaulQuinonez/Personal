import {Request, Response} from 'express'
import { IProducto } from '../interfaces/IProducto'
import { Producto} from '../models/producto'
import fs from 'fs'
import path from 'path'

declare global {
    namespace Express {
      interface Request {
        files: Record<string,any>
      }
    }
  }

const registrar = async (req:Request, res:Response) => {
    
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

        producto.save((err: any, producto_save: any) => {

            if (err) {

                res.status(500).send({ message: 'Error en el servidor' })

            } else {
                if (producto_save) {
                    
                    res.status(200).send({ productos: producto_save })

                } else {
                    res.status(403).send({ message: 'El producto no se registró' })
                }
            }

        })
    } else {

        const producto = new Producto();

        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = '';
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        const productoNuevo = producto.save((err: any, producto_save: any) => {

            if (err) {

                res.status(500).send({ message: 'Error en el servidor' })

            } else {
                if (producto_save) {

                    res.status(200).send({ productos: productoNuevo })

                } else {
                    res.status(403).send({ message: 'El producto no se registró' })
                }
            }

        })

    }

}

function listarProducto(req:Request, res:Response){
    
    const titulo = req.params['titulo'];

    Producto.find({ titulo: new RegExp(titulo, 'i') },(err : any , producto_listado : any) => {

        if (err) {

            console.log(err);
            
            res.status(500).send(err)

        } else {

            if (producto_listado) {

                res.status(200).send({ productos: producto_listado })

            } else {

                res.status(403).send({ message: 'No existe un producto con ese título' })

            }

        }

    });

}

const editarProducto = async (req:Request, res:Response) => {
    
    const data = req.body;
    const id = req.params['id']
    const img = req.params['img'] //OBTENEMOS LA IMAGEN

    if (req.files.imagen) {

        if (img || img != null || img != undefined) {
            fs.unlink('./uploads/productos/' + img, (err: any) => {
                if (err) {
                    throw err;
                }
            });
        }

        const imagen_path = req.files.imagen.path;
        const name = imagen_path.split('\\');
        const imagen_name = name[2];

        await Producto.findByIdAndUpdate({ _id: id }, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: imagen_name,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            idcategoria: data.idcategoria,
            puntos: data.puntos
        }, (err: any, producto_edit: any) => {

            if (err) {

                res.status(500).send({ message: 'Error en el servidor' });

            } else {

                if (producto_edit) {

                    res.status(200).send({ productos: producto_edit })

                } else {

                    res.status(403).send({ message: 'No pudo editar el producto' });

                }

            }

        }).clone().catch(function(err: any){ console.log(err)})

    } else {

        await Producto.findByIdAndUpdate({ _id: id }, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            idcategoria: data.idcategoria,
            puntos: data.puntos
        }, (err: any, producto_edit: any) => {

            if (err) {

                res.status(500).send({ message: 'Error en el servidor' });

            } else {

                if (producto_edit) {

                    res.status(200).send({ productos: producto_edit })

                } else {

                    res.status(403).send({ message: 'No pudo editar el producto' });

                }

            }

        }).clone().catch(function(err: any){ console.log(err)})

    }

}

const obtenerProducto =async (req:Request, res:Response) => {
    
    const id = req.params['id'];

    await Producto.findOne({ _id: id }, (err: any, producto_data : any) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' });

        } else {

            if (producto_data) {

                res.status(200).send({ productos: producto_data })

            } else {

                res.status(403).send({ message: 'No existe el producto' });

            }

        }

    }).clone().catch(function(err: any){ console.log(err)})

}

function eliminarProducto(req:Request, res:Response) {
    
    const id = req.params['id'];

    Producto.findByIdAndRemove({ _id: id }, (err : any, producto_eliminado : any) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (producto_eliminado) {
                fs.unlink('./uploads/productos/' + producto_eliminado.imagen, (err: any) => {
                    if (err) {
                        res.status(500).send({ message: 'Error del servidor', err })
                    }
                });
                res.status(200).send({ productos: producto_eliminado })
            } else {
                res.status(403).send({ message: 'El producto no se pudo eliminar' })
            }
        }
    }).clone().catch(function(err){ console.log(err)})


}

const act_stock =async (req:Request, res:Response) => {
    
    const id = req.params['id'];
    const data = req.body;

    await Producto.findById(id, (err: any, producto_data : any) => {

        if (producto_data) {

            Producto.findByIdAndUpdate(id, { stock: parseInt(producto_data.stock) + parseInt(data.stock) }, (err, producto_edit) => {

                if (producto_edit) {

                    res.status(200).send({ productos: producto_edit });

                } else {
                    res.status(500).send(err)
                }

            })

        }

    }).clone().catch(function(err: any){ console.log(err)})

}

const obtenerImagen = async(req:Request, res:Response) => {

    const img = req.params['img']; //LE DECIMOS QUE BUSQUE LA IMAGEN

    if (img != "null") {

        const path_img = './uploads/productos/' + img;
        res.status(200).sendFile(path.resolve(path_img));

    } else {

        const path_img = './uploads/productos/default.png';
        res.status(200).sendFile(path.resolve(path_img));

    }

}

export {

    registrar,
    listarProducto,
    editarProducto,
    obtenerProducto,
    eliminarProducto,
    act_stock,
    obtenerImagen

}