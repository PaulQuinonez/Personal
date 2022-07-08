import { Component, OnInit} from '@angular/core';
import { ITecnico } from 'src/app/models/ITecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-admin-tecnicos',
  templateUrl: './admin-tecnicos.component.html',
  styleUrls: ['./admin-tecnicos.component.css']
})
export class AdminTecnicosComponent implements OnInit {

  public tecnicos: ITecnico[] = []; //Traemos los tecnicos

  constructor(
    //DECLARAMOS COMO PRIVADA TECNICOSSERVICES QUE SERA IGUAL A LA CLASE CREADA EN LOS SERVICIOS LA CUAL ES TECNICOSERVICE
    private tecnicoServices: TecnicoService) { 
  }

  ngOnInit(): void {
    this.obtenerTodosLosTecnicos();
  }

  //CREAMOS LA FUNCION PARA OBTENER TODOS LOS TECNICOS QUE MOSTRAREMOS EN EL COMPONENT.HTML DE ESTA CARPETA admin-tecnicos
  obtenerTecnicos(){

    //APARTIR DE TECNICOS SERVICES OBTENEMOS LA FUNCION QUE NOS PERMITIRA TRAER UN TECNICO, SUSCRIBIENDOLO PARA ASI MOSTRAR TODOS LOS TECNICOS CREADOS,
    //LOS CUALES SE GUARDARAN EN LA VARIABLE DATA, Y EN EL COMPONENT.HTML LOS MOSTRAREMOS CON UN NGFORM PARA RECORRERLOS
    this.tecnicoServices.getTecnicos().subscribe(data => {

      console.log(data);
      this.tecnicos = data;
      

    }, error => {

      console.log(error);     

    })

  }
  
  public obtenerTodosLosTecnicos(){

    this.obtenerTecnicos();

  }

  //ES UNA FUNCION CREADA PARA ELIMINAR UN TECNICO ATRAVES DEL BOTON ELIMINAR DEL FORMULARIO CREADO EN EL COMPONENT.HTML
  clickEliminarTecnico(tecnicoId: string | undefined){

    //SI EXISTE UN TECNICO CON ESE ID, ATRAVES DE TECNICO SERVICES TRAE LA FUNCION CONECTADA AL BACKEND PARA ELIMINAR ESE TECNICO
    //UNA VEZ ELIMINADO UTILIZAMOS UN SUBSCRIBE PARA LLAMAR A LA FUNCION OBTENERTODOSLOSTECNICOS QUE NOS REFRESACARA LA PÁGINA PERO ACTUALIZADA
    if(tecnicoId){
      this.tecnicoServices.eliminarTecnico(tecnicoId).subscribe(({}) => {
        this.obtenerTodosLosTecnicos();
      })
    }

  }

}
