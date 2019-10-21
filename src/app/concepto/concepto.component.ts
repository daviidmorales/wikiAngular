import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
declare var $: any;

@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.component.html',
  styleUrls: ['./concepto.component.css']
})
export class ConceptoComponent  {

  inicio : boolean = false;
  modelUsuario : {};
  modelMateria : any = [];
  modelConcepto : any = [];
  nombreConcepto : string;
  htmlContent = '';
  opcionSeleccionado: string  = '0';
  idMateria: string  = '';
  nombreMateria : string = '';
  fileSelect : File;
  constructor(private apiService: AppService,private toastr: ToastrService,private router:Router) {}

  ngOnInit(){
    var user = localStorage.getItem("user");
    if(user != null){
      this.modelUsuario = JSON.parse(user);
      this.inicio = true;
      this.getMateria();
      this.getConcepto();
    }else{
      this.router.navigate(['inicio']);
    }
  }
  fileChange(file : any){
    this.fileSelect = file.target.files[0];
  }
  capturar() {
    this.idMateria = this.opcionSeleccionado;
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
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

  getConcepto() {
    this.getConceptoSuccess({
    }).subscribe(operationResult => {
      if(operationResult.data.length > 0){
        this.modelConcepto = operationResult.data;
      }
    });
  }
  getConceptoSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Get('concepto/getConcepto', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }
  addConcepto() {
    var id = this.idMateria;
    var nombreMateria = this.modelMateria.filter(function(item) {
      return item.id === id;
    })[0];

    const formData = new FormData(); 
    formData.append('file', this.fileSelect, this.fileSelect.name);
    formData.append('id', "");
    formData.append('nombreConcepto', this.nombreConcepto);
    formData.append('idMateria', this.idMateria);
    formData.append('nombreMateria', nombreMateria.nombreMateria);
    formData.append('html', this.htmlContent);
    formData.append('urlimage', "");
    
    this.addConceptoSuccess(formData).subscribe(operationResult => {
      this.toastr.success(operationResult.msg, 'Correctamente!');
      this.getConcepto();
    });
  }
  addConceptoSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Post('concepto/createConcepto', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
