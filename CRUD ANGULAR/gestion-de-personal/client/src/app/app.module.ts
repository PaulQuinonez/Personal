import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditarTecnicosComponent } from './components/editar-tecnicos/editar-tecnicos.component';
import { AgregarTecnicoComponent } from './components/agregar-tecnico/agregar-tecnico.component';
import { VerTecnicoComponent } from './components/ver-tecnico/ver-tecnico.component';
import { AdminTecnicosComponent } from './components/admin-tecnicos/admin-tecnicos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    //DECLARAMOS LOS COMPONENTES, ESTO SE HACE AUTOMATICO CUANDO CREAMOS UN NUEVO COMPONENTE
    AppComponent,
    NavbarComponent,
    EditarTecnicosComponent,
    AgregarTecnicoComponent,
    VerTecnicoComponent,
    AdminTecnicosComponent,
    PageNotFoundComponent,
  ],
  imports: [
    //SE IMPORTAN LOS MODULOS QUE USAREMOS EN EL PROYECTO
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
