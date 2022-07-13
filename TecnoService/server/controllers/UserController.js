const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

//REGISTRO DE USUARIOS
function registrar(req, res) {

    const params = req.body; //Me manda el body del request

    const user = new User(); //Se instancia el modelo

    if (params.password) {

        bcrypt.hash(params.password, null, null, function(err, hash) {
            if (hash) {
                user.password = hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.cedula = params.cedula;
                user.email = params.email;
                user.telefono = params.telefono;
                user.role = params.role;

                user.save((err, user_save) => {
                    if (err) {
                        res.status(500).send({ error: 'No se ingresó el usuario' })
                    } else {
                        res.status(200).send({ user: user_save }) //Manda todos los datos registrados
                    }
                })
            }
        })

    } else {

        res.status(403).send({ error: 'No se ingresó una contraseña' })

    }

}

//LOGIN DE USUARIOS
function login(req, res) {

    const data = req.body;

    //Buscamos el usuario por cedula
    User.findOne({ cedula: data.cedula }, (err, user_data) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' })

        } else {
            if (user_data) {
                console.log(user_data.password);
                bcrypt.compare(data.password, user_data.password, function(err, check) {
                    console.log(data.password, user_data.password);
                    if (check) {


                        if (data.gettoken) {
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data,
                            });
                            console.log(jwt);
                        } else {
                            res.status(200).send({
                                user: user_data,
                                message: 'no token',
                                jwt: jwt.createToken(user_data),
                            });
                        }

                    } else {
                        res.status(403).send({ message: 'Las credenciales de ingreso no coinciden' })
                    }
                });

            } else {
                res.status(403).send({ message: 'La identificación no existe' })
            }
        }

    });

}

//OBTENER USUARIOS
function listarUser(req, res) {


    const nombres = req.params['nombres']

    User.find({ nombres: new RegExp(nombres, 'i'), }, (err, user_listado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (user_listado) {
                res.status(200).send({ users: user_listado })
            } else {
                res.status(403).send({ message: 'No existe un usuario con ese nombre' });
            }
        }
    })

}

//ACTUALIZAR USUARIO
function actualizarUser(req, res) {

    const data = req.body;
    const id = req.params['id'];

    if (data.password) {
        bcrypt.hash(data.password, null, null, function(err, hash) {
            if (hash) {
                User.findByIdAndUpdate(id, {
                    nombres: data.nombres,
                    password: hash,
                    email: data.email,
                    telefono: data.telefono,
                    role: data.role
                }, (err, user_edit) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en el servidor' });
                    } else {
                        if (user_edit) {
                            res.status(200).send({ user: user_edit });
                        } else {
                            res.status(403).send({ message: 'No pudo editar el usuario' });
                        }
                    }
                })
            }
        });
    } else {
        User.findByIdAndUpdate(id, {
            nombres: data.nombres,
            email: data.email,
            telefono: data.telefono,
            role: data.role
        }, (err, user_edit) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            } else {
                if (user_edit) {
                    res.status(200).send({ user: user_edit });
                } else {
                    res.status(403).send({ message: 'No pudo editar el usuario' });
                }
            }
        })
    }

}

//OBTENER USUARIO
function obtenerUser(req, res) {

    const id = req.params['id']

    User.findOne({ _id: id }, (err, user_data) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' });

        } else {

            if (user_data) {

                res.status(200).send({ user: user_data })

            } else {

                res.status(403).send({ message: 'No existe el usuario' });

            }

        }

    })

}

function obtenerUserRol(req, res) {

    const role = req.params['role']

    User.find({ role: role }, (err, user_data) => {

        if (err) {

            res.status(500).send({ message: 'Error en el servidor' });

        } else {

            if (user_data) {

                res.status(200).send({ user: user_data })

            } else {

                res.status(403).send({ message: 'No existe el usuario' });

            }

        }

    })

}

//ELIMINAR USUARIO
function eliminarUser(req, res) {

    const id = req.params['id'];

    User.findByIdAndRemove(id, (err, user_eliminado) => {

        if (user_eliminado) {

            res.status(200).send({ user: user_eliminado });

        } else {

            res.status(500).send(err)

        }

    })

}

module.exports = {

    registrar,
    login,
    listarUser,
    obtenerUser,
    obtenerUser,
    obtenerUserRol,
    actualizarUser,
    eliminarUser,

}