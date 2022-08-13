import {Request, Response} from 'express'
import { IVenta } from '../interface/IVenta';
import { Venta} from '../models/venta';
import { IDetalleVenta } from '../interface/IDetalleVenta';
import { DetalleVenta } from '../models/detalleVenta';
import { IProducto } from '../interface/IProducto';
import { Producto as producto} from '../models/producto';


const registrarVenta = (req : Request, res : Response) => {

    const data = req.body;

    const venta = new Venta();

    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    venta.save((err: any, venta_save: { _id: any; }) => {

        if (venta_save) {

            //MUESTRA LOS PRODUCTOS CON CANTIDADES QUE HAYA EN LA VENTA
            let detalles = data.detalles;

            //RECORREMOS LA VARIABLE DETALLES
            detalles.forEach((element: { idproducto: any; cantidad: Number | any; }, index: any) => {
                const detalleventa = new DetalleVenta();
                detalleventa.idproducto = element.idproducto; //EL ELEMENT ES LA VARIABLE QUE ESTA ITERANDO UNO A UNO
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = venta_save._id //OBTENEMOS EL ID DE ESA VENTA

                detalleventa.save((err, detalle_save) => {

                    if (detalle_save) {

                        //OBTENEMOS LOS DATOS DEL PRODUCTO PARA PODER REDUCIR EL STOCK DEL MISMO AL MOMENTO DE VENDERLO
                        producto.findById({ _id: element.idproducto }, (err: any, producto_data: { _id: any; stock: string; }) => {

                            if (producto_data) {

                                producto.findByIdAndUpdate({ _id: producto_data._id }, { stock: parseInt(producto_data.stock) - parseInt(element.cantidad) }, (err, producto_edit) => {

                                        res.end(); //TERMINAMOS EL METODO

                                    }) //CONVERTIMOS A ENTEROS EL STOCK ACTUAL Y LA CANTIDAD VENDIDA

                            } else {

                                res.send({ message: 'No se encontró el producto' })

                            }

                        })

                    } else {

                        res.send({ message: 'No se pudo regitrar la venta' })

                    }

                })
            });

        } else {

            res.send({ message: 'No se pudo regitrar la venta' })

        }

    })

}

const obtenerVenta = async (req : Request, res : Response) => {

    const id = req.params['id'];

    await Venta.findById(id, (err: any, data_venta: any) => {

        if (data_venta) {
            
            DetalleVenta.find({ venta: id }, (err: Error, data_detalle: any) => { //PODEMOS OBTENER LOS PRODUCTOS QUE SE VENDIERON EN ESA VENTA ATRAVES DEL MODELO DE DETALLE DE VENTA, EL CUAL TIENE UN ID DE VENTA LA QUE PERTENECE ESTE

                if (data_detalle) {

                    res.status(200).send({
                        venta: data_venta,
                        detalles: data_detalle
                    })

                }

            })

        }

    }).clone().catch(function(err: any){ console.log(err)})

}

const obtenerVentas = async (req : Request, res : Response) => {

    Venta.find((error, data_venta) => {
        
        if (data_venta) {
            
            res.status(200).send({ ventas: data_venta })

        } else {

            res.status(404).send({ message: 'No se encontraron ventas' })

        }

    })

}

const editarDetalleVenta = async (req : Request, res : Response) => {

    const id = req.params['id'];
    const data = req.body;

    DetalleVenta.findByIdAndUpdate(id, {
        cantidad: data.cantidad
    }, (err, venta_act) => {
        if (venta_act) {

            res.status(200).send({ venta: venta_act });

        } else {

            res.status(500).send(err)

        }
    }).clone().catch(function(err){ console.log(err)})

}

const detalleVenta = async (req: Request, res: Response) => {
    const id = req.params['id'];

    DetalleVenta.find({ id }).populate('idproducto').exec((err, data_detalles) => {

        if (data_detalles) {
            res.status(200).send({ detalles: data_detalles })
        } else {
            res.status(404).send({ message: 'No se encontraron ventas' })
        }

    })
}

const eliminarVenta = async (req : Request, res : Response) => {

    const id = req.params['id'];

    await Venta.findByIdAndRemove(id, (err : Error, venta_eliminado : IVenta) => {

        if (venta_eliminado) {

            res.status(200).send({ cliente: venta_eliminado });

            DetalleVenta.findByIdAndRemove(id, (err : Error, detalle_elimando : IDetalleVenta) => {
                if(detalle_elimando){
                    res.status(200).send({ detalle: detalle_elimando });
                }else{
                    res.status(500).send(err)
                }
            }).clone().catch(function(err){ console.log(err)})

        } else {

            res.status(500).send(err)

        }

    }).clone().catch(function(err){ console.log(err)})

}

export {

    registrarVenta,
    obtenerVenta,
    obtenerVentas,
    editarDetalleVenta,
    detalleVenta,
    eliminarVenta,


}