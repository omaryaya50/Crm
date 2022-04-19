
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { SalesGovernorate } from 'src/app/Interfaces/codes-Interfaces/SalesGovernorate';

@Injectable({
  providedIn: 'root'
})
export class SalesGovernorateService {
    SalesGovernorate:SalesGovernorate;
    SalesGovernorateList:SalesGovernorate[];

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "SalesGovernorate/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.SalesGovernorateList, this.GlobalAPI.httpOptions);
  }

  GetAlldata() {
    return this.http.get<SalesGovernorate[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
 
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
  GetBySalesID(id) {
    return this.http.get<SalesGovernorate[]>(this.localUrl + 'GetBySalesID/'+id, this.GlobalAPI.httpOptions);
  }
  GetBySalesIDview(id) {
   
    return this.http.get<SalesGovernorate[]>(this.localUrl + 'GetBySalesIDview/'+id, this.GlobalAPI.httpOptions);
  }





  DeletebySales(id) {
    return this.http.delete(this.localUrl + 'DeletebySales/'+id );
  }
}
