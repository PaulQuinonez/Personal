import express, {Router, Express} from "express";
import cors from 'cors';

import {api as producto} from './src/routes/producto';
import {api as categoria} from './src/routes/categoria'
import { dbConnection } from "./src/database/db";

class Server{

    app : Router;
    router : Router;
    port : Number;
    paths : {[pass : string] : string};

    private _express : Express;

    constructor(){

        this.app = Router();
        this.router = Router();
        this.port = Number(process.env["PORT"]);

        this.paths = {
            productos: '/api/productos',
            categorias: '/api/categorias'
        }

        this.conexionDB();
        this.middleware();
        this.routes();
        this.router.use('/TecnoService', this.app);
        this._express = express().use(this.router);

    }

    private async conexionDB(){

        await dbConnection();

    }

    private middleware(){
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true })); //NOS SERVIRA EN LOS FORMULARIO
        this.app.use(express.json());
    }

    private routes(){
        this.app.use(this.paths.productos, producto)
        this.app.use(this.paths.categorias, categoria)
    }

    listen(){
        this._express.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}/TecnoService/api/ `);
            console.log("CONEXIÓN CORRECTA");
            console.log("*******************************************");           
            
        })
    }


}

export {Server}