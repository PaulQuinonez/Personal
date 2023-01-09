import { Request, Response } from "express";
import {environment} from "../environment/environment.prod"
import axios from "axios";

const httpAxios = axios.create({
    baseURL: environment.url
})

class IndexController {

    public index(req : Request, res : Response){
        httpAxios.get(`/listado`).then(response => {            
            res.render('index-activo', {activos : response.data.activo})
        }).catch((error) => {
            console.log(error);            
        })
    }

    public create(req: Request, res: Response){
        httpAxios.post('/registro', {
            activoT: req.body.activoT,
        }).then(respuesta => {            
            res.redirect('/activo')
        }).catch((error) => {
            console.log(error);
        })
    }

    public form(req: Request, res: Response){
        res.render('create-activo')
    }

    public editar(req: Request, res: Response){
        httpAxios.patch(`/update/${req.params.id}`, {
            activoT: req.body.activoT,
        }).then(respuesta => {            
            res.redirect('/activo')
        }).catch((error) => {
            console.log(error);
        })
    }

    public formEdit(req: Request, res: Response){
        httpAxios.get(`/${req.params.id}`).then(response => {             
            res.render('edit-activo', {activo : response.data.activo})  
        }).catch((error) => {
            console.log(error);            
        })
    }
    
    public eliminar(req: Request, res: Response){
        
        httpAxios.delete(`/delete/${req.params.id}`).then(response => {             
            res.redirect('/activo')
        }).catch((error) => {
            console.log(error);            
        })
    }

}

export const indexController = new IndexController();