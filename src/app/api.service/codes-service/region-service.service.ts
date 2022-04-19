import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegion } from 'src/app/Interfaces/codes-Interfaces/Region.Interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class RegionService {

  //localUrl = 'http://151.106.34.109:7040/api/Region/';
  obIRegion: IRegion[];
  oboneRegion: IRegion;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Region/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obIRegion, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obIRegion, this.GlobalAPI.httpOptions);
  }
  getMax() {
    return this.http.get<number>(this.localUrl + 'getMax', this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<IRegion[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  getone(index) {
    return this.http.get<IRegion[]>(this.localUrl + 'get/' + index, this.GlobalAPI.httpOptions);
  }
  getMuti(index: any) {

    return this.http.post<IRegion[]>(this.localUrl + 'getMuti', index, this.GlobalAPI.httpOptions);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
  deletelist(listob: any) {
    return this.http.delete(this.localUrl + 'Deletelist' + listob, this.GlobalAPI.httpOptions);
  }
  deleteone(index: any) {
    return this.http.delete(this.localUrl + 'getone/' + index, this.GlobalAPI.httpOptions);
  }

  getBySalesG(Sindex, Gindex) {
    return this.http.get<IRegion[]>(this.localUrl + 'getBySalesG/' + Sindex + '/' + Gindex, this.GlobalAPI.httpOptions);
  }

}
