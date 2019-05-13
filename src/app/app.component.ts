import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppService } from './app.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedItem: any = '';
  inputChanged: any = '';
  wikiItems: any[] = [];
  items2: any[] = [{ id: 0, payload: { label: 'Tom' } },
  { id: 1, payload: { label: 'Multimedia' } },
  { id: 2, payload: { label: 'MultiVariado' } },
  { id: 3, payload: { label: 'Multiplicacion' } },
  { id: 4, payload: { label: 'MultiEstilos' } }
  ];
  config2: any = { 'class': 'test', 'max': 5, 'placeholder': 'Concepto', 'width': "20px", 'sourceField': ['payload', 'label'] };

  onSelect(item: any) {
    this.selectedItem = item;
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  constructor(private apiService: AppService) {}

  login() {
    this.loginSuccess('').subscribe(operationResult => {

    });
  }

  loginSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Post('users/login', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}

