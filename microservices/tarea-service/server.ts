import express, {Router, Express} from "express";
import cors from 'cors';

import {api as tarea} from './src/routes/tarea';
import {dbConnection} from './src/database/db';

class Servidor {

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
            tareas: '/api/tareas'
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
        this.app.use(this.paths.tareas, tarea)
    }

    listen(){
        this._express.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}/TecnoService/api/tareas `);
            console.log("CONEXIÓN CORRECTA");
            console.log("*******************************************");           
            
        })
    }

}

export {Servidor}
