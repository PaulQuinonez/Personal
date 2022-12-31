import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/implementation/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public identity : any;

  constructor(
    private _authService : AuthService,
    private _router : Router,
  ) {
    this.identity = this._authService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity.role == 'ADMIN' || this.identity.role == 'COCINERO'){
      this._router.navigate(['home'])
    }else {
      this._router.navigate(['']);
    }

  }

}
