import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITecnico } from 'src/app/models/ITecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tecnico',
  templateUrl: './agregar-tecnico.component.html',
  styleUrls: ['./agregar-tecnico.component.css']
})
export class AgregarTecnicoComponent implements OnInit {

  //TRAEMOS LA INTERFAZ QUE CONTIENE LA COMPOSICION DEL TECNICO
  public tecnico : ITecnico = {} as ITecnico;

  constructor(

    //DECLARAMOS COMO PRIVADA TECNICOSSERVICES QUE SERA IGUAL A LA CLASE CREADA EN LOS SERVICIOS LA CUAL ES TECNICOSERVICE
    private tecnicoService : TecnicoService,
    //UTILIZAMOS EL ENRUTAMIENTO DE ANGULAR PARA REDIRIGIRNOS A OTRA PAGINA DE LA APP
    private router: Router) { }

  ngOnInit(): void {
  }

  //CREAMOS UNA FUNCION CON LA CUAL PODREMOS AGREGAR UN TECNICO
  public crearTecnico(){

    //ATRAVES DE TECNICOSERVICES TRAEMOS DE LOS SERVICIOS LA FUNCION CREAR TECNICO QUE ESTA CONFIGURADA PARA REALIZAR
    //POST DESDE EL BACKEND, SUBSCRIBOMOS ESTA FUNCION Y LE PASAMOS LA VARIABLE DATA QUE ES DONDE SE GUARDARA EL NUEVO
    //TECNICO, Y UNA VEZ AGREGADO NOS REDIRIGIRA A LA PANTALLA DE INICIO
    this.tecnicoService.crearTecnico(this.tecnico).subscribe((data) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se registró el técnico con éxito!',            
        footer: '<p>TecnoSolutions Messages</p>',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['tecnicos/admin']).then();
    }, (error) => {

      console.log(error);      

    })

  }

}
