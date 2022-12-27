import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './@theme/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [

  //TODO RUTAS PRINCIPALES
  {path: '', component: AuthComponent},
  {path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
