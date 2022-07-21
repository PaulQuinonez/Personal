import {Request, Response} from 'express';
import { environment } from '../environment/environment';
import axios from 'axios';

const httpAxios = axios.create({
    baseURL : environment.url,
})

class IndexController {

    public index(req : Request, res : Response){
        httpAxios.get(`reporte/listado`).then(respuesta => {

            res.render('index-reporte', {reporte : respuesta.data})
            
        }).catch((error) => {
            console.log(error);
            
        })
    }

    public create(req: Request, res: Response){
        httpAxios.post(`reporte/registrar`, {
            asunto: req.body.asunto,
            descripcion: req.body.descripcion,
            problema: req.body.problema
        }).then(respuesta => {
            console.log(respuesta);
            
            res.redirect('http://localhost:4200/inicio')
        }).catch((error) => {
            console.log(error);
            
        })
    }

    public form(req: Request, res: Response){
        res.render('create-reporte')
    }

    public view(req: Request, res : Response){
        httpAxios.get(`reporte/ver/${req.params.id}`).then(respuesta => {
            
            res.render('view-reporte', {reporte: respuesta.data.reporte})
            
                        
        })
    }

    public eliminar(req: Request, res : Response){
        httpAxios.delete(`reporte/eliminar/${req.params.id}`).then(respuesta => {
            res.redirect('/reportes')
        })
    }
}

export const indexController = new IndexController();