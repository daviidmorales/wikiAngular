import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public endPointService: string = environment.apiUrl;
  public clientHeaders: HttpHeaders;

  constructor(private _http: HttpClient) { }

  SetEndPoint(nameServer: string) {
    this.endPointService = nameServer;
  }

  Get(methodService: string, methodParams: Array<any>): Observable<any> {
    let EndPointRequest = this.endPointService + methodService + '?';
    for (const tuple of Object.keys(methodParams)) {
      EndPointRequest += tuple + '=' + methodParams[tuple] + '&';
    }
    let tokenStorage = 'Bearer ';
    tokenStorage += (environment.clientStorageType === 'SESSION') ? sessionStorage.getItem('applicationCurrentUser') : localStorage.getItem('applicationCurrentUser');
    const headers =  new HttpHeaders().set('Authorization', tokenStorage);
    return this._http.get(EndPointRequest.slice(0, -1), { headers });
  }

  Post(methodService: string, methodParams: object): Observable<any> {
    let tokenStorage = 'Bearer ';
    const EndPointRequest = `${this.endPointService}${methodService}`;
     tokenStorage += (environment.clientStorageType === 'SESSION') ?
      sessionStorage.getItem('applicationCurrentUser') :
      localStorage.getItem('applicationCurrentUser');
    const headers = new HttpHeaders().set('Authorization', tokenStorage);
    return this._http.post(EndPointRequest, methodParams, { headers });
  }

  Put(methodService: string, methodParams: object): Observable<any> {
    const EndPointRequest = `${this.endPointService}${methodService}`;
    const headers = 
      new HttpHeaders().set('Authorization',
        localStorage.getItem('applicationCurrentUser')); 
    return this._http.put(EndPointRequest, methodParams, { headers });
  }

  Delete(methodService: string, methodParams: HttpParams): Observable<any> {
    let EndPointRequest = this.endPointService + methodService + '?';
    for (const tuple of Object.keys(methodParams)) {
      EndPointRequest += tuple + '=' + methodParams[tuple] + '&';
    }
    let tokenStorage = 'Bearer ';
    tokenStorage += (environment.clientStorageType === 'SESSION') ? sessionStorage.getItem('applicationCurrentUser') : localStorage.getItem('applicationCurrentUser');
    const headers =  new HttpHeaders().set('Authorization', tokenStorage); 
    return this._http.delete(EndPointRequest.slice(0, -1), { headers });
  }
}
