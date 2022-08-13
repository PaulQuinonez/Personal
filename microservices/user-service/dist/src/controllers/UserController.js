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
exports.eliminarUserPorId = exports.actualizaruserPorId = exports.obtenerUserPorId = exports.obtenerUser = exports.login = exports.registrar = void 0;
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const user_1 = require("../models/user");
const jwt_1 = require("../helpers/jwt");
function registrar(req, res) {
    const params = req.body; //Me manda el body del request
    const user = new user_1.User(); //Se instancia el modelo
    if (params.password) {
        bcrypt_nodejs_1.default.hash(params.password, null, null, function (err, hash) {
            if (hash) {
                user.password = hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.cedula = params.cedula;
                user.email = params.email;
                user.role = params.role;
                user.save((err, user_save) => {
                    if (err) {
                        res.status(500).send({ error: 'No se ingresó el usuario' });
                    }
                    else {
                        res.status(200).send({ user: user_save }); //Manda todos los datos registrados
                    }
                });
            }
        });
    }
    else {
        res.status(403).send({ error: 'No se ingresó una contraseña' });
    }
}
exports.registrar = registrar;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    //Buscamos el usuario por email
    yield user_1.User.findOne({ cedula: data.cedula }, (err, user_data) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        }
        else {
            if (user_data) {
                bcrypt_nodejs_1.default.compare(data.password, user_data.password, function (err, check) {
                    if (check) {
                        if (data.gettoken) {
                            res.status(200).send({
                                jwt: (0, jwt_1.createToken)(user_data),
                                user: user_data,
                            });
                        }
                        else {
                            res.status(200).send({
                                user: user_data,
                                message: 'no token',
                                jwt: (0, jwt_1.createToken)(user_data),
                            });
                        }
                    }
                    else {
                        res.status(403).send({ message: 'Las credenciales de ingreso no coinciden' });
                    }
                });
            }
            else {
                res.status(403).send({ message: 'La identificación no existe' });
            }
        }
    }).clone().catch(function (err) { console.log(err); });
});
exports.login = login;
const obtenerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.find();
        res.status(200).send({ users: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hay un problema');
    }
});
exports.obtenerUser = obtenerUser;
const obtenerUserPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params['id'];
        yield user_1.User.findById(id, (err, user_data) => {
            if (user_data) {
                res.status(200).send({ user: user_data });
            }
            else {
                res.status(400).send({ message: 'No existe el usuario' });
            }
        }).clone().catch(function (err) { console.log(err); });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hay un problema');
    }
});
exports.obtenerUserPorId = obtenerUserPorId;
const actualizaruserPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params['id'];
        const data = req.body;
        yield user_1.User.findByIdAndUpdate(id, data, (err, user_data) => {
            if (user_data) {
                res.status(200).send({ message: 'Usuario actualizado', data_act: user_data });
            }
            else {
                res.status(400).send({ message: 'No existe el usuario' });
            }
        }).clone().catch(function (err) { console.log(err); });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hay un problema');
    }
});
exports.actualizaruserPorId = actualizaruserPorId;
//ELIMINAR USUARIO
const eliminarUserPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params['id'];
        const UsuarioEliminado = yield user_1.User.findByIdAndDelete(id, { new: true });
        res.status(200).send({ message: 'Usuario eliminado con éxito', data: UsuarioEliminado });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hay un problema');
    }
});
exports.eliminarUserPorId = eliminarUserPorId;
