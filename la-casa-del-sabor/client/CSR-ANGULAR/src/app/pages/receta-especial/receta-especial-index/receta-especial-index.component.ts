import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/implementation/auth.service';
import { RecetaEspecialService } from 'src/app/@core/implementation/receta-especial.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receta-especial-index',
  templateUrl: './receta-especial-index.component.html',
  styleUrls: ['./receta-especial-index.component.css']
})
export class RecetaEspecialIndexComponent implements OnInit {

  public recetas : any;
  public url;
  public identity : any;

  constructor(
    private _recetaEspecialService : RecetaEspecialService,
    private _authService : AuthService,
    private router : Router
  ) {
    this.url = environment.url_micro;
    this.identity = _authService.getIdentity()
   }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN' || this.identity.role == 'COCINERO'){
      this._recetaEspecialService.getRecetasEspecial().subscribe(
        response => {

          this.recetas = response.receta

        }
      )
    } else {
      this.router.navigate(['']);
    }


  }

  removeRecetaEspecial(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger mx-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Seguro quieres eliminar esta receta?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'La receta fue eliminada correctamente.',
          'success'
        )

        this._recetaEspecialService.removeRecetasEspecial(id).subscribe(
          response => {
            this._recetaEspecialService.getRecetasEspecial().subscribe(
              response => {
                this.recetas = response.receta;
              }
            )
          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se canceló la petición',
          'error'
        )
      }
    })
  }

}