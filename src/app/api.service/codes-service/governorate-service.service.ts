import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGovernorate } from 'src/app/Interfaces/codes-Interfaces/Governorate.Interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class GovernorateService {
  //localUrl = 'http://151.106.34.109:7040/api/Governorate/';
  obIGovernorate: IGovernorate;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Governorate/";

  postdata() {
    return this.http.post(this.localUrl + 'post', this.obIGovernorate, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obIGovernorate, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<IGovernorate[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  getone(index) {
    return this.http.get<IGovernorate[]>(this.localUrl + 'getBySector' + '/' + index, this.GlobalAPI.httpOptions);
  }
  FindByTerritoryId(index, id2: any) {

    return this.http.post<IGovernorate[]>(this.localUrl + 'FindByTerritoryId' + '/' + index
      , id2, this.GlobalAPI.httpOptions);
  }
  
  FindByTerritoryandse(index, id2: any) {

    return this.http.get<IGovernorate[]>(this.localUrl + 'get' + '/' + index + '/' + id2, this.GlobalAPI.httpOptions);

  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }

  getBySalesS(Sindex, Secindex) {
    return this.http.get<IGovernorate[]>(this.localUrl + 'getBySalesS/' + Sindex + '/' + Secindex, this.GlobalAPI.httpOptions);
  }
}
