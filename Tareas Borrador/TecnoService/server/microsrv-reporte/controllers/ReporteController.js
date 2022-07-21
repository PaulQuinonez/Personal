const Reporte = require("../models/reporte");

function registrar(req, res) {

    const data = req.body; //Aqui van todos los datos del formulario

    const reporte = new Reporte();

    reporte.asunto = data.asunto;
    reporte.descripcion = data.descripcion;
    reporte.problema = data.problema;

    reporte.save((err, reporte_save) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (reporte_save) {
                res.status(200).send({ reporte: reporte_save })
            } else {
                res.status(403).send({ message: 'El reporte no se pudo registrar' })
            }
        }

    })

}

function obtenerReporte(req, res) {

    const id = req.params['id'];

    Reporte.findById({ _id: id }, (err, reporte_data) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (reporte_data) {
                res.status(200).send({ reporte: reporte_data })
            } else {
                res.status(500).send({ message: 'el reporte no existe' })
            }
        }

    })
}

function editarReporte(req, res) {

    const id = req.params['id'];

    const data = req.body;

    Reporte.findByIdAndUpdate({ _id: id }, { titulo: data.titulo, descripcion: data.descripcion, problema: data.problema }, (err, reporte_edit) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (reporte_edit) {
                res.status(200).send({ reporte: reporte_edit })
            } else {
                res.status(403).send({ message: 'El reporte no se pudo actualizar' })
            }
        }
    })

}

function eliminarReporte(req, res) {

    const id = req.params['id'];

    Reporte.findByIdAndRemove({ _id: id }, (err, Reporte_eliminada) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (Reporte_eliminada) {
                res.status(200).send({ Reporte: Reporte_eliminada })
            } else {
                res.status(403).send({ message: 'El reporte no se pudo eliminar' })
            }
        }
    })

}

function listarReporte(req, res) {

    Reporte.find((err, reporte_listado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (reporte_listado) {
                res.status(200).send(reporte_listado)
            } else {
                res.status(403).send({ message: 'No reportes con ese título' })
            }
        }
    });

}

module.exports = {

    registrar,
    obtenerReporte,
    editarReporte,
    eliminarReporte,
    listarReporte

}