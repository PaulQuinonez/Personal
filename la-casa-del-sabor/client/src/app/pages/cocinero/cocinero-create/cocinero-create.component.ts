import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/implementation/auth.service';
import { CocineroService } from 'src/app/@core/implementation/cocinero.service';
import { Cocinero } from 'src/app/@core/models/cocinero.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cocinero-create',
  templateUrl: './cocinero-create.component.html',
  styleUrls: ['./cocinero-create.component.css']
})
export class CocineroCreateComponent implements OnInit {

  public cocinero;
  public identity : any;

  constructor(

    private _cocineroService : CocineroService,
    private _authService : AuthService,
    private router : Router,

  ) {
    this.cocinero = new Cocinero('', '', 0, '', '', '');
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN'){

    } else {
      this.router.navigate(['']);
    }
  }

  registrar(cocineroForm:any){
    if(cocineroForm.valid){
      console.log(cocineroForm.value);

      this._cocineroService.postCocinero({
        password: cocineroForm.value.password,
        name: cocineroForm.value.name,
        sueldo: cocineroForm.value.sueldo,
        email: cocineroForm.value.email,
        role: cocineroForm.value.role
      }).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cocinero registrado correctamente!',
            footer: '<p>La Casa del Sabor</p>',
            showConfirmButton: false,
            timer: 1500
          })
          this.cocinero = new Cocinero('', '', 0, '', '', '');
          this.router.navigate(['cocinero'])
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
