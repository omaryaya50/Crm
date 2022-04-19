import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerCompetition } from 'src/app/Interfaces/customer/ICustomerCompetition';
import { GlobalAPIService } from '../global-api.service';
import { CustomersCompanies } from 'src/app/Interfaces/View/customers-companies';
import { CustomersNames } from 'src/app/Interfaces/View/customers-names';


@Injectable({
  providedIn: 'root'
})
export class CustomerCompetitionService
{
    //localUrl = 'http://151.106.34.109:7040/api/CustomerCompetition/';
    obICustomerCompetition: ICustomerCompetition[];
    OldCompetition: ICustomerCompetition[];
    oboneCustomerCompetition: ICustomerCompetition;
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "CustomerCompetition/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.obICustomerCompetition, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.obICustomerCompetition, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<ICustomerCompetition[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  getone(index)
  {
    return this.http.get<ICustomerCompetition[]>(this.localUrl + 'get/' + index, this.GlobalAPI.httpOptions);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
  deletelist(listob: any)
  {
    return this.http.delete(this.localUrl + 'Deletelist' + listob, this.GlobalAPI.httpOptions);
  }
  deleteone(index: any)
  {
    return this.http.delete(this.localUrl + 'getone/' + index, this.GlobalAPI.httpOptions);
  }

  CustomercompitionCompanyView(index)
  {
    return this.http.get<CustomersCompanies[]>(this.localUrl + 'CustomercompitionCompanyView/'+index, this.GlobalAPI.httpOptions);
  }

  NotCustomercompitionCompanyView()
  {
    return this.http.get<CustomersNames[]>(this.localUrl + 'NotCustomercompitionCompanyView', this.GlobalAPI.httpOptions);
  }

}
