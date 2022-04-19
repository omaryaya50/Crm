import { Injectable, APP_ID } from '@angular/core';
import { ISalesRep } from 'src/app/Interfaces/codes-Interfaces/isales-rep';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';

@Injectable({
  providedIn: 'root'
})
export class SalesRepService {


  // localUrl ='http://151.106.34.109:7040/api/SalesRep/'; 

  objSalesRep: ISalesRep;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "SalesRep/";



  postdata() {

    return this.http.post<ISalesRep>(this.localUrl + 'post', this.objSalesRep, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put<ISalesRep>(this.localUrl + 'put', this.objSalesRep, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {

    return this.http.get<ISalesRep[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }

  GetByPlace(g, t) {
    return this.http.get<ISalesRep[]>(this.localUrl + 'getSales/' + g + '/' + t, this.GlobalAPI.httpOptions);
  }
  GetSalesByFullPlace(g, t, s, r) {

    return this.http.get<ISalesRep[]>(this.localUrl + 'getSales/' + g + '/' + t + '/' + s + '/' + r, this.GlobalAPI.httpOptions);
  }

  GetByUserID(index) {
    return this.http.get<number>(this.localUrl + 'getSalesID/' + index, this.GlobalAPI.httpOptions);
  }
  GetSalesByoldsales(index,index2) {
    return this.http.get<ISalesRep[]>(this.localUrl + 'GetSalesByoldsales/' + index+"/"+index2, this.GlobalAPI.httpOptions);
  }


  salesexist(index) {
    return this.http.get<boolean>(this.localUrl + 'salesexist/' + index, this.GlobalAPI.httpOptions);
  }

  getone(index) {
    return this.http.get<ISalesRep>(this.localUrl + 'get/' + index, this.GlobalAPI.httpOptions);
  }
  Getmax() {
    return this.http.get<number>(this.localUrl + 'GetMax', this.GlobalAPI.httpOptions);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
