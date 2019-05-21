import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  inicio : boolean = false;
  modelUsuario : {};
  constructor(private router:Router) { }

  ngOnInit(){
    debugger;
    var user = localStorage.getItem("user");
    if(user != null){
      this.modelUsuario = JSON.parse(user);
      this.inicio = true;
    }else{
      this.router.navigate(['inicio']);
    }
  }

}
