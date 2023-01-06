import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/@core/implementation/auth.service';
import { RecetaEspecialService } from 'src/app/@core/implementation/receta-especial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receta-especial-view',
  templateUrl: './receta-especial-view.component.html',
  styleUrls: ['./receta-especial-view.component.css']
})
export class RecetaEspecialViewComponent implements OnInit {

  public id : any;
  public receta : any;
  public identity : any;

  constructor(
    private _route : ActivatedRoute,
    private _recetaEspecialService : RecetaEspecialService,
    private _authService : AuthService,
    private router : Router
  ) {
    this.identity = this._authService.getIdentity();
   }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN' || this.identity.role == 'COCINERO'){
      this._route.params.subscribe(params => {
        this.id = params['id'];


        this._recetaEspecialService.getRecetaEspecial(this.id).subscribe(
          response => {
            this.receta = response.receta
          }
        )
      })
    } else {
      this.router.navigate(['']);
    }

  }

}
