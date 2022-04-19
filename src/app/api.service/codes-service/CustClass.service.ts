import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustClass } from 'src/app/Interfaces/codes-Interfaces/CustClass.Interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class CustClassService {
   //localUrl = 'http://151.106.34.109:7040/api/CustClassification/';
    obCustClass: CustClass;
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "CustClassification/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.obCustClass, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.obCustClass, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<CustClass[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Deleteclass(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
