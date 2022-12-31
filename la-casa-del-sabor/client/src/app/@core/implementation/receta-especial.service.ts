import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecetaEspecial } from '../models/receta-especial.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecetaEspecialService {

  public url;
  public receta;
  public token;

  constructor(
    private _http : HttpClient,
    private _authService : AuthService
  ) {
    this.url = environment.url_micro;
    this.token = _authService.getToken();
    this.receta = new RecetaEspecial('', '', '');
  }

  postRecetaEspecial(data : any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.post(this.url + 'registrar', data, {headers : headers})
  }

  getRecetasEspecial() : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.get(this.url + 'lista', {headers : headers})
  }

  getRecetaEspecial(id:any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.get(this.url + 'receta/' + id, {headers : headers})
  }

  patchRecetasEspecial(data : any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.patch(this.url + 'recetaUpdate/' + data._id, data, {headers : headers})
  }

  removeRecetasEspecial(id : any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.delete(this.url + 'recetaRemove/' + id, {headers : headers})
  }
}
