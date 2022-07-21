import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ITecnico } from 'src/app/models/ITecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tecnicos',
  templateUrl: './editar-tecnicos.component.html',
  styleUrls: ['./editar-tecnicos.component.css']
})
export class EditarTecnicosComponent implements OnInit {

  //CREAMOS UNA VARIABLE PARA PODER GUARDAR EL ID DEL TECNICO QUE EDITAREMOS
  public tecnicoId: string | null = null;
  //TRAEMOS LA INTERFAZ QUE CONTIENE LA COMPOSICION DEL TECNICO
  public tecnico : ITecnico = {} as ITecnico;

  constructor(
    //DECLARAMOS COMO PRIVADA TECNICOSSERVICES QUE SERA IGUAL A LA CLASE CREADA EN LOS SERVICIOS LA CUAL ES TECNICOSERVICE
    private tecnicoService : TecnicoService,
    //UTILIZAMOS EL MODULO DE ANGULAR ACTIVATEDROUTE PARA PODER OBTENER EL ID DEL TECNICO
    private activateRouter : ActivatedRoute,
    //UTILIZAMOS EL ENRUTAMIENTO DE ANGULAR PARA REDIRIGIRNOS A OTRA PAGINA DE LA APP
    private router : Router) { }

  ngOnInit(): void {

    //ATRAVES DE ACTIVATE ROUTER SUBSCRIBIMOS LA VARIABLE PARAM QUE NOS SERVIRA PARA OBTENER TECNICO ID
    this.activateRouter.paramMap.subscribe((param: ParamMap) => {

      this.tecnicoId = param.get('tecnicoId')

    });

    //SI EXISTE UN TECNICO ID
    if(this.tecnicoId){
      
      //ENTONCES LLAMAMOS A LA FUNCION GET TECNICO QUE NOS PERMITE OBTENER EL ID DE ESTE TECNICO Y ASI PORDER REDIRIGIRNOS EN EL
      //NAVEGADOR PERO CON EL ID CORRESPONDIENTE Y APARTE DE ESO TRAEMOS TODOS LOS DATOS Y LOS UBICAMOS EN SUS RESPECTIVOS
      //CAMPOS, ESTO LO USAMOS EN EL COMPONENT.HTML DE LA CARPETA EDITAR-TECNICOS
      this.tecnicoService.getTecnico(this.tecnicoId).subscribe((data: ITecnico) => {
        this.tecnico = data;
      });

    }

  }

  //UNA VEZ OBTENIDO EL ID DEL TECNICO PROCEDEMOS A ACTUALIZARLO
  public actualizarTecnico(){

    //SI EXISTE UN TECNICO CON ESE ID
    if(this.tecnicoId){
      //ENTONCES ATRAVES DE LA FUNCION TECNICO QUE ESTA CONECTADA AL BACKEND PODEMOS ACTUALIZARLO
      this.tecnicoService.editarTecnico(this.tecnicoId,this.tecnico).subscribe((data) => {
        //UNA VEZ ACTUALIZADO USAMOS EL ENRUTAMIENTO DE ANGULAR PARA PODER REDIRIGIRNOS A LA PAGINA PRINCIPAL, DONDE
        //SE VERA EL TECNICO ACTUALIZADO
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se actualizo el técnico con éxito!',            
          footer: '<p>Tecno Solutions Messages</p>',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['tecnicos/admin']).then();
      }, (error) => {
  
        console.log(error);      
  
      })
    }
  }

  //ESTO VALIDA QUE LOS CAMPOS DE UN TECNICO NO ESTEN VACIOS
  public isNotEmpty(){
    return Object.keys(this.tecnico).length > 0;
  }  

}
