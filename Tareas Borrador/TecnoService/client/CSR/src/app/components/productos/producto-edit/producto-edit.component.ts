import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { environment } from 'src/environments/environment';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';
import { ScriptUploadService } from 'src/app/services/script-upload.service';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  public producto:any;
  public id:any;
  public categorias:any;
  public url;
  public file: any | File;
  public imgSelect: any | String | ArrayBuffer;
  public identity : any;

  constructor(

    private _route : ActivatedRoute,
    private _productoService : ProductoService,
    private _userService : UserService,
    private route : Router,
    private _uploadScriptService : ScriptUploadService

  ) { 

    this.url = environment.url;
    this.identity = this._userService.getIdentity();
    this._uploadScriptService.Upload(["validacionProducto"]);

  }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN'){

      this._route.params.subscribe(params => {

        this.id = params['id'];
        this._productoService.get_producto(this.id).subscribe(
          response => {
            this.producto = response.producto;
            this._productoService.get_categorias().subscribe(
              response => {
                this.categorias = response.categorias;        
              },
              error =>{
        
              }
            )
            
            
          },
          error => {
  
          }
        )
  
      })

    }else{

      this.route.navigate([('')]);

    }

  }

  imgSelected(event: any | HtmlInputEvent){
    if(event.target.files && event.target.files[0]){

      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(this.file);

    }
  }

  onSubmit(productoForm:any){
    if(productoForm.valid){
      this._productoService.put_producto({
        _id: this.id,
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        imagen: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        idcategoria: productoForm.value.idcategoria,
        puntos: productoForm.value.puntos,
        img_name: this.producto.imagen,
      }).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto actualizado correctamente!',
            footer: '<p>Tecno Service Messages</p>',
            showConfirmButton: false,
            timer: 1500
          })
          
          this.route.navigate(['productos'])
          
        },
        error => {

        }
      )
      
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Rellena todos los campos del formulario!',
        footer: '<p>Tecno Service Messages</p>'
      })
      
    }
  }

}
