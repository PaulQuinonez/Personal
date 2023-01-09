import cors from "cors";
import express, { Router, Express } from "express";
import { connectionDB } from "./database/db";
import { api as activo } from "./routes/activo.routes";

export class Server{

    //VARIABLES GENERALES
    app: Router;
    router: Router;
    port: Number;
    paths: {[pass: string] : string};

    private _express : Express;

    constructor(){

        this.app = Router();
        this.router = Router();
        this.port = Number(process.env.PORT || 3100);

        // SUB-RUTA
        this.paths = {
            activo : '/activo'
        }

        // EJECUCION METODOS
        this.db();
        this.middlewares();
        this.routes();

        // RUTA GENERAL
        this.router.use('/', this.app);
        this._express = express().use(this.router);
    }

    private async db() {
        await connectionDB();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.activo, activo)
    }
    
    listen(){
        this._express.listen(this.port, () => {
            
            console.clear();
            console.log('Microservicio de Activo disponible ahora, la conexión fue un éxito!');
            console.log("******************************************************************* \n");            
            console.log(`Servidor corriendo en: http://localhost:${this.port}/activo`);
        })
    }


}