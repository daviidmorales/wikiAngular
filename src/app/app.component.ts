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

  constructor(private apiService: AppService) {}

  login() {
    this.loginSuccess({userName : 'lherrera2',
    passWord : '1234567'}).subscribe(operationResult => {
      console.log(operationResult);
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

