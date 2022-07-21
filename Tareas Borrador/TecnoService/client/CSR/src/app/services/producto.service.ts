import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(

    private _http: HttpClient,

  ) { 

    this.url = environment.url;

  }

  //LISTAR PRODUCTOS
  get_productos(filtro: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto/' + '/listado/' + filtro, {headers:headers})
  }

  get_categorias():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'categoria/' + 'listado/', {headers:headers})
  }

  post_producto(data:any){
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('descripcion',data.descripcion);
    fd.append('imagen',data.imagen);
    fd.append('precio_compra',data.precio_compra);
    fd.append('precio_venta',data.precio_venta);
    fd.append('stock',data.stock);
    fd.append('idcategoria',data.idcategoria);
    fd.append('puntos',data.puntos);

    return this._http.post(this.url + 'producto/' + '/registrar', fd)
  }

  get_producto(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'producto/' + 'ver/' + id, {headers:headers})
  }

  put_producto(data:any){
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('descripcion',data.descripcion);
    fd.append('imagen',data.imagen);
    fd.append('precio_compra',data.precio_compra);
    fd.append('precio_venta',data.precio_venta);
    fd.append('idcategoria',data.idcategoria);
    fd.append('puntos',data.puntos);

    return this._http.put(this.url + 'producto/' + 'editar/' + data._id + '/' + data.img_name, fd)
  }

  post_categoria(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'categoria/' + '/registrar', data, {headers:headers})
  }

  eliminar_producto(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'producto/' + '/eliminar/' + id, {headers:headers})
  }

  act_stock(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');    
    return this._http.put(this.url+'producto/actualizar/stock/'+data._id,data,{headers:headers});
  }
  

}
