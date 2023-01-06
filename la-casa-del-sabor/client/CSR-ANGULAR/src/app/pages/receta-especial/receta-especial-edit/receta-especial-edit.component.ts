import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/@core/implementation/auth.service';
import { RecetaEspecialService } from 'src/app/@core/implementation/receta-especial.service';
import { RecetaEspecial } from 'src/app/@core/models/receta-especial.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receta-especial-edit',
  templateUrl: './receta-especial-edit.component.html',
  styleUrls: ['./receta-especial-edit.component.css']
})
export class RecetaEspecialEditComponent implements OnInit {

  public id : any;
  public receta : any;
  public identity : any;

  constructor(
    private _route : ActivatedRoute,
    private _recetaEspecialService : RecetaEspecialService,
    private _authService : AuthService,
    private router : Router
  ) {
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN' || this.identity.role == 'COCINERO'){
      this._route.params.subscribe(params => {
        this.id = params['id'];

        this._recetaEspecialService.getRecetaEspecial(this.id).subscribe(
          response => {
            this.receta = response.receta
          }
        )
      })
    } else {
      this.router.navigate(['']);
    }


  }

  updateRecetaEspecial(recetaForm : any){
    if(recetaForm.valid) {

      this._recetaEspecialService.patchRecetasEspecial({
        _id : this.id,
        nombre: recetaForm.value.nombre,
        nIngredientes : recetaForm.value.nIngredientes
      }).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Receta Especial actualizada correctamente!',
            footer: '<p>La Casa del Sabor</p>',
            showConfirmButton: false,
            timer: 1500
          })
          this.receta = new RecetaEspecial('', '', '')
          this.router.navigate(['receta-especial'])
        }
      )

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Rellena todos los campos del formulario!',
        footer: '<p>La Casa del Sabor</p>',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
