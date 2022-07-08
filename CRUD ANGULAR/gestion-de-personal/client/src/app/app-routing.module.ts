import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTecnicosComponent } from './components/admin-tecnicos/admin-tecnicos.component';
import { AgregarTecnicoComponent } from './components/agregar-tecnico/agregar-tecnico.component';
import { EditarTecnicosComponent } from './components/editar-tecnicos/editar-tecnicos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VerTecnicoComponent } from './components/ver-tecnico/ver-tecnico.component';

const routes: Routes = [

  //CONFIGURAMOS LAS RUTAS QUE NOS PERMITIRAN NAVEGAR EN LA APLICACION
  {path: '', redirectTo: 'tecnicos/admin', pathMatch: 'full'}, //ESTA SER ALA RUTA POR DEFECTO
  {path: 'tecnicos/admin', component: AdminTecnicosComponent}, //RUTA PARA LISTAR TODOS LOS TECNICOS
  {path: 'tecnicos/agregar', component: AgregarTecnicoComponent}, //RUTA PARA AGREGAR TECNICO
  {path: 'tecnicos/editar/:tecnicoId', component: EditarTecnicosComponent}, //RUTA PARA EDITAR TECNICO
  {path: 'tecnicos/ver/:tecnicoId', component: VerTecnicoComponent}, // RUTA PARA VER UN TECNICO
  {path: '**', component: PageNotFoundComponent} //Ruta para pagina no encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
