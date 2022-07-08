import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { ITecnico } from 'src/app/models/ITecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-ver-tecnico',
  templateUrl: './ver-tecnico.component.html',
  styleUrls: ['./ver-tecnico.component.css']
})
export class VerTecnicoComponent implements OnInit {

  //CREAMOS UNA VARIABLE PARA PODER GUARDAR EL ID DEL TECNICO QUE DESEMAOS VER
  public tecnicoId: string | null = null;
  //TRAEMOS LA INTERFAZ QUE CONTIENE LA COMPOSICION DEL TECNICO PARA MOSTRAR SUS DATOS
  public tecnico:ITecnico = {} as ITecnico;

  constructor(
    
    //UTILIZAMOS EL MODULO DE ANGULAR ACTIVATEDROUTE PARA PODER OBTENER EL ID DEL TECNICO
    private activateRouter : ActivatedRoute,
    //DECLARAMOS COMO PRIVADA TECNICOSSERVICES QUE SERA IGUAL A LA CLASE CREADA EN LOS SERVICIOS LA CUAL ES TECNICOSERVICE
    private tecnicoService: TecnicoService) { }

  ngOnInit(): void {

    //ATRAVES DE ACTIVATE ROUTER SUBSCRIBIMOS LA VARIABLE PARAM QUE NOS SERVIRA PARA OBTENER TECNICO ID
    this.activateRouter.paramMap.subscribe((param: ParamMap) => {

      this.tecnicoId = param.get('tecnicoId')

    }); 

    //SI EXISTE UN TECNICO ID
    if(this.tecnicoId){
      
      //ENTONCES LLAMAMOS A LA FUNCION GET TECNICO QUE NOS PERMITE OBTENER EL ID DE ESTE TECNICO Y ASI PORDER REDIRIGIRNOS EN EL
      //NAVEGADOR PERO CON EL ID CORRESPONDIENTE Y APARTE DE ESO TRAEMOS TODOS LOS DATOS Y LOS UBICAMOS EN SUS RESPECTIVOS
      //CAMPOS, ESTO LO USAMOS EN EL COMPONENT.HTML DE LA CARPETA VER-TECNICOS
      this.tecnicoService.getTecnico(this.tecnicoId).subscribe((data: ITecnico) => {
        this.tecnico = data;
      });

    }

  }

  //ESTO VALIDA QUE LOS CAMPOS DE UN TECNICO NO ESTEN VACIOS
  public isNotEmpty(){
    return Object.keys(this.tecnico).length > 0;
  }

}
