import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalesField } from 'src/app/Interfaces/codes-Interfaces/SalesField.Interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class SalesFieldService {
  //localUrl = 'http://151.106.34.109:7040/api/SalesField/';
  obSalesField: SalesField;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "SalesField/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obSalesField, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obSalesField, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<SalesField[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
