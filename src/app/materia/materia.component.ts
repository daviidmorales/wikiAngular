import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent{

  inicio : boolean = false;
  modelUsuario : {};
  modelMateria : any = [];
  nombreMateria : string;
  descripcionMateria : string;
  opcionSeleccionado: string  = '0';
  idSemestre: string  = '';
  constructor(private apiService: AppService,private toastr: ToastrService,private router:Router) {}

  ngOnInit(){
    var user = localStorage.getItem("user");
    if(user != null){
      this.modelUsuario = JSON.parse(user);
      this.inicio = true;
      this.getMateria();
    }else{
      this.router.navigate(['inicio']);
    }
  }

  getMateria() {
    this.getMateriaSuccess({
    }).subscribe(operationResult => {
      this.modelMateria = [];
      if(operationResult.data.length > 0){
        this.modelMateria = operationResult.data;
      }
    });
  }
  getMateriaSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Get('materia/getMateria', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }

  capturar() {
    this.idSemestre = this.opcionSeleccionado;
  }
  addMateria() {
    this.addMateriaSuccess({
      id : "",
      nombreMateria : this.nombreMateria,
      descripcionMateria : this.descripcionMateria,
      idSemestre : this.idSemestre
    }).subscribe(operationResult => {
      this.toastr.success(operationResult.msg, 'Correctamente!');
      this.getMateria();
    });
  }
  addMateriaSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Post('materia/createMateria', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

}
