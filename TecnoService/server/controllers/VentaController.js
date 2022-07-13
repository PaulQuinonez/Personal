const Venta = require('../models/venta');
const DetalleVenta = require('../models/detalleventa');
const Cliente = require('../models/cliente');
const producto = require('../models/producto');

function registrarVenta(req, res) {

    const data = req.body;

    const venta = new Venta();

    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    venta.save((err, venta_save) => {

        if (venta_save) {

            //MUESTRA LOS PRODUCTOS CON CANTIDADES QUE HAYA EN LA VENTA
            let detalles = data.detalles;

            //RECORREMOS LA VARIABLE DETALLES
            detalles.forEach((element, index) => {
                const detalleventa = new DetalleVenta();
                detalleventa.idproducto = element.idproducto; //EL ELEMENT ES LA VARIABLE QUE ESTA ITERANDO UNO A UNO
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = venta_save._id //OBTENEMOS EL ID DE ESA VENTA

                detalleventa.save((err, detalle_save) => {

                    if (detalle_save) {

                        //OBTENEMOS LOS DATOS DEL PRODUCTO PARA PODER REDUCIR EL STOCK DEL MISMO AL MOMENTO DE VENDERLO
                        producto.findById({ _id: element.idproducto }, (err, producto_data) => {

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

function obtenerVenta(req, res) {

    const id = req.params['id'];

    Venta.findById(id).populate('idcliente').populate('iduser').exec((err, data_venta) => {

        if (data_venta) {

            //venta : data_venta._id me mustra unicamente los datos asignados a esa venta
            DetalleVenta.find({ venta: data_venta._id }).populate('idproducto').exec({ idventa: id }, (err, data_detalle) => { //PODEMOS OBTENER LOS PRODUCTOS QUE SE VENDIERON EN ESA VENTA ATRAVES DEL MODELO DE DETALLE DE VENTA, EL CUAL TIENE UN ID DE VENTA LA QUE PERTENECE ESTE

                if (data_detalle) {

                    res.status(200).send({
                        data: {
                            venta: data_venta,
                            detalles: data_detalle
                        }
                    })

                }

            });

        }

    });

}

function listadoVentaUser(req, res) {

    const id = req.params['id'];

    Venta.find({ iduser: id }).populate('idcliente').populate('iduser').exec((err, data_venta) => {

        if (data_venta) {
            res.status(200).send({ ventas: data_venta })

        } else {

            res.status(404).send({ message: 'No se encontraron ventas' })

        }

    })

}

function listadoVentaAdmin(req, res) {

    Venta.find().populate('idcliente').populate('iduser').exec((err, data_venta) => {

        if (data_venta) {
            res.status(200).send({ ventas: data_venta })

        } else {

            res.status(404).send({ message: 'No se encontraron ventas' })

        }

    })

}

function detalleVenta(req, res) {

    const id = req.params['id'];

    DetalleVenta.find({ venta: id }).populate('idproducto').exec((err, data_detalles) => {

        if (data_detalles) {
            res.status(200).send({ detalles: data_detalles })
        } else {
            res.status(404).send({ message: 'No se encontraron ventas' })
        }

    })
}

module.exports = {

    registrarVenta,
    obtenerVenta,
    listadoVentaUser,
    listadoVentaAdmin,
    detalleVenta

}