import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/@core/implementation/auth.service';
import { RecetaService } from 'src/app/@core/implementation/receta.service';

@Component({
  selector: 'app-receta-view',
  templateUrl: './receta-view.component.html',
  styleUrls: ['./receta-view.component.css']
})
export class RecetaViewComponent implements OnInit {

  public id : any;
  public receta : any;
  public identity : any;

  constructor(
    private _route : ActivatedRoute,
    private _recetaService : RecetaService,
    private _authService : AuthService,
    private router : Router,
  ) {
    this.identity = this._authService.getIdentity();
   }

  ngOnInit(): void {

    if(this.identity.role == 'ADMIN' || this.identity.role == 'COCINERO'){
      this._route.params.subscribe(params => {
        this.id = params['id'];

        this._recetaService.getReceta(this.id).subscribe(
          response => {
            this.receta = response
          }
        )
      })
    } else {
      this.router.navigate(['']);
    }

  }

}
