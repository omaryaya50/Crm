import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iterritory } from 'src/app/Interfaces/codes-Interfaces/Territory.interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class TerritoryService {
  // localUrl = 'http://151.106.34.109:7040/api/Territory/';
  obIterritory: Iterritory;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Territory/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obIterritory, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obIterritory, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<Iterritory[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  getone(index) {
    return this.http.get<Iterritory[]>(this.localUrl + 'getone' + '/' + index, this.GlobalAPI.httpOptions);
  }
  getBySales(index) {
    return this.http.get<Iterritory[]>(this.localUrl + 'getBySales' + '/' + index, this.GlobalAPI.httpOptions);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
