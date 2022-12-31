import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preparacion } from '../models/preparacion.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreparacionService {

  public urlMono;
  public preparacion;
  public token;

  constructor(
    private _http : HttpClient,
    private _authService : AuthService
  ) {

    this.urlMono = environment.url_mono;
    this.token = _authService.getToken();
    this.preparacion = new Preparacion('', '', '', 0, 0, '','','')

  }

  postPreparacion(data:any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.post(this.urlMono + 'preparacion', data, {headers : headers})
  }

  getPreparaciones() : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.get(this.urlMono + 'preparacion', {headers : headers})
  }

  getPreparacion(id:any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.get(this.urlMono + 'preparacion/' + id, {headers : headers})
  }

  patchPreparacion(response:any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.patch(this.urlMono + 'preparacion/' + response._id, response, {headers : headers})
  }

  removePreparacion(id:any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this._http.delete(this.urlMono + 'preparacion/' + id, {headers : headers})
  }

  //TODO MONOLITICO

  // postPreparacionMono(data:any) : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.post(this.urlMono + 'preparacion', data, {headers : headers})
  // }

  // getPreparacionesMono() : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.get(this.urlMono + 'preparacion', {headers : headers})
  // }

  // getPreparacionMono(id:any) : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.get(this.urlMono + 'preparacion/' + id, {headers : headers})
  // }

  // patchPreparacionMono(response:any) : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.patch(this.urlMono + 'preparacion/' + response._id, response, {headers : headers})
  // }

  // removePreparacionMono(id:any) : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.patch(this.urlMono + 'preparacion/' + id, {headers : headers})
  // }

  //TODO MICROSERVICIO

  // postPreparacionMicro(data:any) : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.post(this.urlMicro + 'preparacion', data, {headers : headers})
  // }

  // getPreparacionesMicro() : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.get(this.urlMicro + 'preparacion', {headers : headers})
  // }

  // getPreparacionMicro(id:any) : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.get(this.urlMicro + 'preparacion/' + id, {headers : headers})
  // }

  // patchPreparacionMicro(response:any) : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.patch(this.urlMicro + 'preparacion/' + response._id, response, {headers : headers})
  // }

  // removePreparacionMicro(id:any) : Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   });

  //   return this._http.patch(this.urlMicro + 'preparacion/' + id, {headers : headers})
  // }


}
