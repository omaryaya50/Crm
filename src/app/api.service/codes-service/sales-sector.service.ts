import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { SalesSactor } from 'src/app/Interfaces/codes-Interfaces/sales-sactor';

@Injectable({
  providedIn: 'root'
})
export class SalesSectorService {
  SalesSactor:SalesSactor;
  SalesSactorList:SalesSactor[];

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "SalesSector/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.SalesSactor, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.SalesSactor, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<SalesSactor[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
 
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
  GetBySalesID(id) {
    return this.http.get<SalesSactor[]>(this.localUrl + 'GetBySalesID/'+id, this.GlobalAPI.httpOptions);
  }
  GetBySalesIDview(id) {
    return this.http.get<SalesSactor[]>(this.localUrl + 'GetBySalesIDview/'+id, this.GlobalAPI.httpOptions);
  }
  GetBySectorID(id) {
    return this.http.get<SalesSactor[]>(this.localUrl + 'GetBySectorID/'+id, this.GlobalAPI.httpOptions);
  }
  GetBySalesSector(id , rid) {
    return this.http.get<SalesSactor[]>(this.localUrl + 'GetBySalesSector/'+id+'/'+rid, this.GlobalAPI.httpOptions);
  }

  DeleteNull() {
    return this.http.delete(this.localUrl + 'DeleteNull' , this.GlobalAPI.httpOptions);
  }

  DeletebySales(id) {
    return this.http.delete(this.localUrl + 'DeletebySales/'+id , this.GlobalAPI.httpOptions);
  }
}
