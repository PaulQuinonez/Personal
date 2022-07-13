const Categoria = require('../models/categoria');

function registrar(req, res) {

    const data = req.body; //Aqui van todos los datos del formulario

    const categoria = new Categoria();

    categoria.titulo = data.titulo;
    categoria.descripcion = data.descripcion;

    categoria.save((err, categoria_save) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (categoria_save) {
                res.status(200).send({ categoria: categoria_save })
            } else {
                res.status(403).send({ message: 'La categoría no se pudo registrar' })
            }
        }

    })

}

function obtenerCategoria(req, res) {

    const id = req.params['id'];

    Categoria.findById({ _id: id }, (err, categoria_data) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (categoria_data) {
                res.status(200).send({ categoria: categoria_data })
            } else {
                res.status(500).send({ message: 'La categoría no existe' })
            }
        }

    })
}

function editarCategoria(req, res) {

    const id = req.params['id'];

    const data = req.body;

    Categoria.findByIdAndUpdate({ _id: id }, { titulo: data.titulo, descripcion: data.descripcion }, (err, categoria_edit) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (categoria_edit) {
                res.status(200).send({ categoria: categoria_edit })
            } else {
                res.status(403).send({ message: 'La categoría no se pudo actualizar' })
            }
        }
    })

}

function eliminarCategoria(req, res) {

    const id = req.params['id'];

    Categoria.findByIdAndRemove({ _id: id }, (err, categoria_eliminada) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (categoria_eliminada) {
                res.status(200).send({ categoria: categoria_eliminada })
            } else {
                res.status(403).send({ message: 'La categoría no se pudo eliminar' })
            }
        }
    })

}

function listarCategoria(req, res) {

    const titulo = req.params['titulo'];

    Categoria.find({ titulo: new RegExp(titulo, 'i') }, (err, categoria_listado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (categoria_listado) {
                res.status(200).send({ categorias: categoria_listado })
            } else {
                res.status(403).send({ message: 'No hay categorías con ese título' })
            }
        }
    });

}

module.exports = {

    registrar,
    obtenerCategoria,
    editarCategoria,
    eliminarCategoria,
    listarCategoria

}