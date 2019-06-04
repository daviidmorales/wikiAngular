import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  usuario : string;
  contrasena : string;
  inicio : boolean = false;
  modelUsuario : {};
  modelMateria : any = [];
  modelConcepto : any = [];

  constructor(private apiService: AppService,private toastr: ToastrService ) {}

  ngOnInit(){
    var user = localStorage.getItem("user");
    if(user != null){
      this.modelUsuario = JSON.parse(user);
      this.inicio = true;
    }
  }
  
  login() {
    this.loginSuccess({
      userName : this.usuario,
      passWord : this.contrasena
    }).subscribe(operationResult => {
      if(operationResult.data.length > 0){
        this.inicio = true;
        this.modelUsuario = operationResult.data[0];
        localStorage.setItem("user",JSON.stringify(this.modelUsuario));
        this.toastr.success('Ingreso Correctamente', 'Exito!');
        $(".close").click();
        window.location.reload();
      }else{
        this.toastr.error('No se encontro el usuario', 'Error!');
      }
    });
  }

  loginSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Post('users/login', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }

  getMateria(semestre : any) {
    this.getMateriaSuccess({
      idSemestre : semestre
    }).subscribe(operationResult => {
      this.modelMateria = [];
      this.modelConcepto = [];
      if(operationResult.data.length > 0){
        this.modelMateria = operationResult.data;
      }else{
        this.toastr.warning('El semestre '+semestre+' no tiene materias asignadas', 'Advertencia!');
      } 
    });
  }
  getMateriaSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Post('materia/getMateriaSemestre', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }

  getConcepto(materia : any) {
    this.getConceptoSuccess({
      idMateria : materia
    }).subscribe(operationResult => {
      if(operationResult.data.length > 0){
        this.modelConcepto = operationResult.data;
      }else{
        this.modelConcepto = [];
        this.toastr.warning('No hay conceptos asignados a la materia', 'Advertencia!');
      } 
    });
  }
  getConceptoSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Post('concepto/getConceptoMateria', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }

  mostrarHtml(item: any){
    document.getElementById("html").innerHTML = item.html;
  }
  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}

