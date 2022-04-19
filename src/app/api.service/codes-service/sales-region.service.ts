import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { SalesRegion } from 'src/app/Interfaces/codes-Interfaces/sales-region';
@Injectable({
  providedIn: 'root'
})
export class SalesRegionService {
  SalesRegion:SalesRegion;
  SalesRegionList:SalesRegion[];

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "SalesRegion/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.SalesRegion, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.SalesRegion, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<SalesRegion[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }

  GetBySalesID(id) {
    return this.http.get<SalesRegion[]>(this.localUrl + 'GetBySalesID/'+id, this.GlobalAPI.httpOptions);
  }
  GetByRegionID(id) {
    return this.http.get<SalesRegion[]>(this.localUrl + 'GetByRegionID/'+id, this.GlobalAPI.httpOptions);
  }
  GetByRegionIDview(id) {
    return this.http.get<SalesRegion[]>(this.localUrl + 'GetByRegionIDview/'+id, this.GlobalAPI.httpOptions);
  }
  GetBySalesRegion(id , rid) {
    return this.http.get<SalesRegion[]>(this.localUrl + 'GetBySalesRegion/'+id+'/'+rid, this.GlobalAPI.httpOptions);
  }

  DeleteNull() {
    return this.http.delete(this.localUrl + 'DeleteNull', this.GlobalAPI.httpOptions );
  }

  DeletebySales(id) {
    return this.http.delete(this.localUrl + 'DeletebySales/'+id , this.GlobalAPI.httpOptions);
  }
}
