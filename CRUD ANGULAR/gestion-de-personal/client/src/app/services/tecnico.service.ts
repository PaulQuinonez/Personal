import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ITecnico } from '../models/ITecnico';

@Injectable({
  providedIn: 'root'
})

//LA CLASE TECNICO SERVICE UTILIZA EL HTTPCLIENT PARA PODER CONECTARSE AL BACKEND A TRAVES DEL URL YA DEFINIDO
export class TecnicoService {

  url = 'http://127.0.0.1:3000/api/tecnicos/'

  constructor(private http: HttpClient) { }

  //RUTA PARA OBTENER TECNICOS
  getTecnicos(): Observable<any>{
    return this.http.get(this.url);
  }

  //RUTA PARA OBTENER UN SOLO TECNICO
  getTecnico(id: string): Observable<any>{
    return this.http.get(this.url + 'ver/' + id);
  }

  //RUTA PARA AGREGAR UN NUEVO TECNICO
  crearTecnico(tecnico: ITecnico) : Observable<any>{

    return this.http.post(this.url + 'agregar', tecnico);

  }

  //RUTA PARA EDITAR UN TECNICO
  editarTecnico(id: string, tecnico:ITecnico): Observable<any>{
    return this.http.put(this.url + 'editar/' + id, tecnico);
  }

  //RUTA PARA ELIMINAR UN TECNICO
  eliminarTecnico(id:string): Observable<any>{
    return this.http.delete(this.url + 'eliminar/' + id);
  }
}
