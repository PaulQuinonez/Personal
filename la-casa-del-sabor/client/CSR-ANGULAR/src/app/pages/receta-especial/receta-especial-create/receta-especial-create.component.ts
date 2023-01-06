import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/implementation/auth.service';
import { RecetaEspecialService } from 'src/app/@core/implementation/receta-especial.service';
import { RecetaEspecial } from 'src/app/@core/models/receta-especial.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receta-especial-create',
  templateUrl: './receta-especial-create.component.html',
  styleUrls: ['./receta-especial-create.component.css']
})
export class RecetaEspecialCreateComponent implements OnInit {

  public receta;
  public identity : any;

  constructor(
    private _recetaEspecialService : RecetaEspecialService,
    private _authService : AuthService,
    private router : Router
  ) {
    this.receta = new RecetaEspecial('', '', '');
    this.identity = this._authService.getIdentity();
   }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN' || this.identity.role == 'COCINERO'){

    } else {
      this.router.navigate(['']);
    }

  }

  registrarRecetaEspecial(recetaForm : any){

    if(recetaForm.valid){

      this._recetaEspecialService.postRecetaEspecial({
        nombre: recetaForm.value.nombre,
        nIngredientes: recetaForm.value.nIngredientes
      }).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Receta especial agregada correctamente!',
            footer: '<p>La Casa Del Sabor</p>',
            showConfirmButton: false,
            timer: 1500
          })
          this.receta = new RecetaEspecial('', '', '');
          this.router.navigate(['receta-especial'])
        }
      )

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Rellena todos los campos del formulario!',
        footer: '<p>La Casa Del Sabor</p>'
      })
    }

  }

}
