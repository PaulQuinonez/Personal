"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const server_1 = require("./server");
(0, dotenv_1.config)();
const servidor = new server_1.Server();
servidor.listen();
