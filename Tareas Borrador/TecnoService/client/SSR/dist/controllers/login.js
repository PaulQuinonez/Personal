"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const environment_1 = require("../environment/environment");
const axios_1 = __importDefault(require("axios"));
const httpAxios = axios_1.default.create({
    baseURL: environment_1.environment.url,
});
class LoginController {
    inicioSesion(req, res) {
        httpAxios.post('user/login').then(response => {
            console.log(response.data.users);
            res.render('');
        });
    }
}
exports.loginController = new LoginController();
