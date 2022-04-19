import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalAPIService {

 public URLAPI:string="http://localhost:62975/api/";
 // public URLAPI:string="https://www.besttopsystems.net:4339/api/";
public httpOptions = {
  headers: new HttpHeaders(
      {
        Authorization: `Bearer ` + localStorage.getItem('jwt'),
      }
  )
};
private httpClient: HttpClient;
constructor(public http: HttpClient) {
  this.httpClient = http;

} 
}
