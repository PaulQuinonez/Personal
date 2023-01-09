"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const environment_prod_1 = require("../environment/environment.prod");
const axios_1 = __importDefault(require("axios"));
const httpAxios = axios_1.default.create({
    baseURL: environment_prod_1.environment.url
});
class IndexController {
    index(req, res) {
        httpAxios.get(`/listado`).then(response => {
            res.render('index-activo', { activos: response.data.activo });
        }).catch((error) => {
            console.log(error);
        });
    }
    create(req, res) {
        httpAxios.post('/registro', {
            activoT: req.body.activoT,
        }).then(respuesta => {
            res.redirect('/activo');
        }).catch((error) => {
            console.log(error);
        });
    }
    form(req, res) {
        res.render('create-activo');
    }
    editar(req, res) {
        httpAxios.patch(`/update/${req.params.id}`, {
            activoT: req.body.activoT,
        }).then(respuesta => {
            res.redirect('/activo');
        }).catch((error) => {
            console.log(error);
        });
    }
    formEdit(req, res) {
        httpAxios.get(`/${req.params.id}`).then(response => {
            res.render('edit-activo', { activo: response.data.activo });
        }).catch((error) => {
            console.log(error);
        });
    }
    eliminar(req, res) {
        httpAxios.delete(`/delete/${req.params.id}`).then(response => {
            res.redirect('/activo');
        }).catch((error) => {
            console.log(error);
        });
    }
}
exports.indexController = new IndexController();
