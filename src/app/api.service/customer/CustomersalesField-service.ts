import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerSalesField } from 'src/app/Interfaces/customer/ICustomerSalesField';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerSalesFieldView } from 'src/app/Interfaces/View/icustomer-sales-field-view';
import { TotalSalesField } from 'src/app/Interfaces/View/total-sales-field';

@Injectable({
  providedIn: 'root'
})
export class CustomerSalesFieldService {
  //localUrl = 'http://151.106.34.109:7040/api/CustomerSalesField/';
  obICustomerSalesField: ICustomerSalesField[];
  oboneCustomerSalesField: ICustomerSalesField;
  oldSalesField: ICustomerSalesField[];
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "CustomerSalesField/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obICustomerSalesField, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obICustomerSalesField, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<ICustomerSalesField[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }

  SalesManagerCustomerSalesFieldView(Sid) {
    return this.http.get<ICustomerSalesFieldView[]>(this.localUrl + 'SalesManagerCustomerSalesFieldView/'+Sid, this.GlobalAPI.httpOptions);
  }

  CustomerSalesFieldViews(index) {
    return this.http.get<ICustomerSalesFieldView[]>(this.localUrl + 'CustomerSalesFieldViews/'+index, this.GlobalAPI.httpOptions);
  }

  totalSalesFieldViews() {
    return this.http.get<TotalSalesField[]>(this.localUrl + 'totalSalesFieldViews', this.GlobalAPI.httpOptions);
  }
  getone(index) {
    return this.http.get<ICustomerSalesField[]>(this.localUrl + 'get/' + index, this.GlobalAPI.httpOptions);
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

}
