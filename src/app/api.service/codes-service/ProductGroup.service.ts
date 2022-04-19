import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InProductGroup } from 'src/app/Interfaces/codes-Interfaces/ProductGroup.interface';
import { GlobalAPIService } from '../global-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {
   //localUrl = 'http://151.106.34.109:7040/api/ProductGroup/';
    obInProductGroup: InProductGroup;
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "ProductGroup/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.obInProductGroup, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.obInProductGroup, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<InProductGroup[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
