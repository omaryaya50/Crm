import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerProductGroup } from 'src/app/Interfaces/customer/ICustomerProductGroup';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerProductGroupView } from 'src/app/Interfaces/View/icustomer-product-group-view';
import { TotalCustomerGroup } from 'src/app/Interfaces/View/total-customer-group';
import { TotalforTotal } from 'src/app/Interfaces/View/totalfor-total';


@Injectable({
  providedIn: 'root'
})
export class CustomerProductGroupService {
  //localUrl = 'http://151.106.34.109:7040/api/CustomerProductGroup/';
  obICustomerProductGroup: ICustomerProductGroup[];
  OldProductGroup: ICustomerProductGroup[];
  oboneCustomerProductGroup: ICustomerProductGroup;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "CustomerProductGroup/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obICustomerProductGroup, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obICustomerProductGroup, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<ICustomerProductGroup[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  getone(index) {
    return this.http.get<ICustomerProductGroup[]>(this.localUrl + 'get/' + index, this.GlobalAPI.httpOptions);
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

  CustomerProductGroupViews(inex) {
    return this.http.get<ICustomerProductGroupView[]>(this.localUrl + 'CustomerProductGroupViews/'+inex, this.GlobalAPI.httpOptions);
  }
  TotalCustomerProductsViews() {
    return this.http.get<TotalCustomerGroup[]>(this.localUrl + 'TotalCustomerProductsViews', this.GlobalAPI.httpOptions);
  }

  TotalForTotalViews() {
    return this.http.get(this.localUrl + 'TotalForTotalViews', this.GlobalAPI.httpOptions);
  }

  SalesManagerCustomerProductGroupView(Sid) {
    return this.http.get<ICustomerProductGroupView[]>(this.localUrl + 'SalesManagerCustomerProductGroupView/'+Sid, this.GlobalAPI.httpOptions);
  }

}
