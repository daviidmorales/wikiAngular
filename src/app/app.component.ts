import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from './app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usuario : string;
  contrasena : string;
  inicio : boolean = false;
  modelUsuario : {};

  constructor(private apiService: AppService,private toastr: ToastrService,private router:Router) {}

  ngOnInit(){
    debugger;
    var user = localStorage.getItem("user");
    if(user != null){
      this.modelUsuario = JSON.parse(user);
      this.inicio = true;
    }
  }
  logaut(){
    localStorage.removeItem("user");
    this.modelUsuario = {};
    this.inicio = false;
    this.router.navigate(['inicio']);
  }
}

