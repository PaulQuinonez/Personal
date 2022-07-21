import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import {User} from "../../../models/User"
import Swal from 'sweetalert2';
import { ScriptUploadService } from 'src/app/services/script-upload.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token: any;
  public identity: any;
  public data_error: any;
  public cookieValue : any;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private cookieService : CookieService,
    private _uploadScriptService : ScriptUploadService
  ) {
    this.identity = this._userService.getIdentity();
    this.user = new User('','','','','','','','');
    this._uploadScriptService.Upload(["validaciones"]);
  }

  ngOnInit(): void {

    //VALIDACION DE LOGIN
    if(this.identity.role == 'ADMIN' || this.identity.role == 'VENDEDOR' || this.identity.role == 'TECNICO'){
      this._router.navigate(['inicio']);
    }

    //NOTIFICACION COOKIE - VALIDACION
    if (!this.cookieService.check('Cookie')) {
      Swal.fire({
        position: 'center',
        title: '<strong>GDPR (General Data Protection Regulation - Reglamento General Protección de Datos)</strong>',
        html: '<a>Tecno Service utiliza cookies propias y de terceros para mejorar sus servicios. Puede obtener más información en nuestra' + 
        ' <a href="https://www.gobiernoelectronico.gob.ec/politica-de-cookies/" style="cursor: pointer; color: #545454; text-decoration: none; font-weight: bold;">Política de Cookies</a>. Una vez iniciado sesión ' + 
        'las cookies se generan automáticamente sin confirmacion previa',
        showConfirmButton: true,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Entendido!',
        timer: 10000
      })
    }

  }

  login(loginForm: any){

    //COMPROBAMOS EL FORMULARIO SEA VÁLIDO
    if(loginForm.valid){

      this._userService.login(this.user).subscribe(
        response => {          
          //ALMACENAMOS EL TOKEN EN EL LOCAL STORAGE DEL NAVEGADOR
          this.token = response.jwt;
          localStorage.setItem('token',this.token);

          //COOKIE
          this.cookieService.set('Cookie', this.token);
          this.cookieValue = this.cookieService.get('Cookie');

          this._userService.login(this.user, true).subscribe(
            response => {
              localStorage.setItem('identity', JSON.stringify(response.user));
              //LO RETORNAMOS A UNA NUEVA VISTA
              this._router.navigate(['inicio'])
            },
            error => {

            }
          )
          
        },
        error => {
          
          Swal.fire({
            title: this.data_error = error.error.message,
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url("../../../../assets/img/trees.png")',
            backdrop: `
              rgba(0,0,123,0.4)
              url("../../../../assets/img/nyan-cat.gif")
              left top
              no-repeat
            `
          })
          
        }
      )

    }else{

      Swal.fire({
        title: 'Ooops!',
        text: 'Debes rellenar todos los campos',
        imageUrl: '../../../../assets/img/piffle-error.gif',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })

    }

  }

}

