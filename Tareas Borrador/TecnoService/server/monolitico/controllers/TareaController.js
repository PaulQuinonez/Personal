const Tarea = require('../models/tarea');

function registrar(req, res) {

    const data = req.body

    const tarea = new Tarea();

    tarea.titulo = data.titulo;
    tarea.descripcion = data.descripcion;
    tarea.problema = data.problema;
    tarea.iduser = data.iduser;
    tarea.idcliente = data.idcliente;

    tarea.save((err, tarea_save) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' })

        } else {

            if (tarea_save) {

                res.status(200).send({ tarea: tarea_save })

            } else {

                res.status(403).send({ message: 'La tarea no se pudo registrar' })

            }

        }

    })

}

function obtenerTarea(req, res) {

    const id = req.params['id'];

    Tarea.findById({ _id: id }, (err, tarea_data) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (tarea_data) {
                res.status(200).send({ tarea: tarea_data })
            } else {
                res.status(500).send({ message: 'La tarea no existe' })
            }
        }

    })
}

function obtenerTareaUser(req, res) {

    const id = req.params['id'];

    Tarea.find({ iduser: id }).populate('iduser').populate('idcliente').exec((err, tarea_listado) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' });

        } else {

            if (tarea_listado) {

                res.status(200).send({ tareas: tarea_listado })

            } else {

                res.status(403).send({ message: 'La tarea no existe para este usuario' });

            }

        }

    })
}

function listarTareaUser(req, res) {

    const titulo = req.params['titulo'];
    const id = req.params['id'];

    Tarea.find({ iduser: id, titulo: new RegExp(titulo, 'i') }).populate('iduser').populate('idcliente').exec((err, tarea_listado) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' });

        } else {

            if (tarea_listado) {

                res.status(200).send({ tareas: tarea_listado })

            } else {

                res.status(403).send({ message: 'No existe un tarea con ese título' });

            }

        }

    });

}

function listarTareaAdmin(req, res) {

    const titulo = req.params['titulo'];

    Tarea.find({ titulo: new RegExp(titulo, 'i') }).populate('iduser').populate('idcliente').exec((err, tarea_listado) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' });

        } else {

            if (tarea_listado) {

                res.status(200).send({ tareas: tarea_listado })

            } else {

                res.status(403).send({ message: 'No existe un tarea con ese título' });

            }

        }

    });

}

function editarTarea(req, res) {

    const id = req.params['id'];

    const data = req.body;

    Tarea.findByIdAndUpdate({ _id: id }, data, (err, tarea_edit) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (tarea_edit) {
                res.status(200).send({ tarea: tarea_edit })
            } else {
                res.status(403).send({ message: 'La tarea no se pudo actualizar' })
            }
        }
    })

}

function eliminarTarea(req, res) {

    const id = req.params['id'];

    Tarea.findByIdAndRemove({ _id: id }, (err, tarea_eliminada) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (tarea_eliminada) {
                res.status(200).send({ tarea: tarea_eliminada })
            } else {
                res.status(403).send({ message: 'La tarea no se pudo eliminar' })
            }
        }
    })

}

module.exports = {

    registrar,
    obtenerTarea,
    obtenerTareaUser,
    listarTareaUser,
    listarTareaAdmin,
    editarTarea,
    eliminarTarea

}