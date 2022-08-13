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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarVenta = exports.editarDetalleVenta = exports.obtenerVentas = exports.obtenerVenta = exports.registrarVenta = void 0;
const venta_1 = require("../models/venta");
const detalleVenta_1 = require("../models/detalleVenta");
const producto_1 = require("../models/producto");
const registrarVenta = (req, res) => {
    const data = req.body;
    const venta = new venta_1.Venta();
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;
    venta.save((err, venta_save) => {
        if (venta_save) {
            //MUESTRA LOS PRODUCTOS CON CANTIDADES QUE HAYA EN LA VENTA
            let detalles = data.detalles;
            //RECORREMOS LA VARIABLE DETALLES
            detalles.forEach((element, index) => {
                const detalleventa = new detalleVenta_1.DetalleVenta();
                detalleventa.idproducto = element.idproducto; //EL ELEMENT ES LA VARIABLE QUE ESTA ITERANDO UNO A UNO
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = venta_save._id; //OBTENEMOS EL ID DE ESA VENTA
                detalleventa.save((err, detalle_save) => {
                    if (detalle_save) {
                        //OBTENEMOS LOS DATOS DEL PRODUCTO PARA PODER REDUCIR EL STOCK DEL MISMO AL MOMENTO DE VENDERLO
                        producto_1.Producto.findById({ _id: element.idproducto }, (err, producto_data) => {
                            if (producto_data) {
                                producto_1.Producto.findByIdAndUpdate({ _id: producto_data._id }, { stock: parseInt(producto_data.stock) - parseInt(element.cantidad) }, (err, producto_edit) => {
                                    res.end(); //TERMINAMOS EL METODO
                                }); //CONVERTIMOS A ENTEROS EL STOCK ACTUAL Y LA CANTIDAD VENDIDA
                            }
                            else {
                                res.send({ message: 'No se encontró el producto' });
                            }
                        });
                    }
                    else {
                        res.send({ message: 'No se pudo regitrar la venta' });
                    }
                });
            });
        }
        else {
            res.send({ message: 'No se pudo regitrar la venta' });
        }
    });
};
exports.registrarVenta = registrarVenta;
const obtenerVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield venta_1.Venta.findById(id, (err, data_venta) => {
        if (data_venta) {
            detalleVenta_1.DetalleVenta.find({ venta: id }, (err, data_detalle) => {
                if (data_detalle) {
                    res.status(200).send({
                        venta: data_venta,
                        detalles: data_detalle
                    });
                }
            });
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.obtenerVenta = obtenerVenta;
const obtenerVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    venta_1.Venta.find((error, data_venta) => {
        if (data_venta) {
            res.status(200).send({ ventas: data_venta });
        }
        else {
            res.status(404).send({ message: 'No se encontraron ventas' });
        }
    });
});
exports.obtenerVentas = obtenerVentas;
const editarDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const data = req.body;
    detalleVenta_1.DetalleVenta.findByIdAndUpdate(id, {
        cantidad: data.cantidad
    }, (err, venta_act) => {
        if (venta_act) {
            res.status(200).send({ venta: venta_act });
        }
        else {
            res.status(500).send(err);
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.editarDetalleVenta = editarDetalleVenta;
const eliminarVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    yield venta_1.Venta.findByIdAndRemove(id, (err, venta_eliminado) => {
        if (venta_eliminado) {
            res.status(200).send({ cliente: venta_eliminado });
            detalleVenta_1.DetalleVenta.findByIdAndRemove(id, (err, detalle_elimando) => {
                if (detalle_elimando) {
                    res.status(200).send({ detalle: detalle_elimando });
                }
                else {
                    res.status(500).send(err);
                }
            }).clone().catch(function (err) { console.log(err); });
        }
        else {
            res.status(500).send(err);
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.eliminarVenta = eliminarVenta;
