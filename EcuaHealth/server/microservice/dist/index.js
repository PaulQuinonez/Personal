"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const servidor_1 = require("./servidor");
(0, dotenv_1.config)();
const servidor = new servidor_1.Server();
servidor.listen();
