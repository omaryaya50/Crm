import { ICustomerProductGroupPerYear } from 'src/app/Interfaces/customer/ICustomerProductGroupPerYear';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerProductGroupView } from 'src/app/Interfaces/View/icustomer-product-group-view';

@Injectable({
    providedIn: 'root'
  })
  export class CustomerProductGroupPerYearService
  {
      //localUrl = 'http://151.106.34.109:7040/api/CustomerProductGroupPerYear/';
      obICustomerProductGroupPerYear: ICustomerProductGroupPerYear[];
      oboneCustomerProductGroupPerYear: ICustomerProductGroupPerYear;
      oldProductGroup:ICustomerProductGroupPerYear[];
      constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

      localUrl = this.GlobalAPI.URLAPI + "CustomerProductGroupPerYear/";
    postdata()
    {
      return this.http.post(this.localUrl + 'post', this.obICustomerProductGroupPerYear, this.GlobalAPI.httpOptions);
    }
    putdata()
    {
      return this.http.put(this.localUrl + 'put', this.obICustomerProductGroupPerYear, this.GlobalAPI.httpOptions);
    }
    GetAlldata()
    {
      return this.http.get<ICustomerProductGroupPerYear[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
    }

   

    getone(index)
    {
      return this.http.get<ICustomerProductGroupPerYear[]>(this.localUrl + 'get/' + index, this.GlobalAPI.httpOptions);
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
  }