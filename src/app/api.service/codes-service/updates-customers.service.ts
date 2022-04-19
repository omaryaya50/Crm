import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUpdatesCustomerSales } from 'src/app/Interfaces/codes-Interfaces/iupdates-customer-sales';
import { GlobalAPIService } from '../global-api.service';

@Injectable({
  providedIn: 'root'
})
export class UpdatesCustomersService {

  IUpdatesCustomerSales:IUpdatesCustomerSales;
  IUpdatesCustomerSalesList:IUpdatesCustomerSales[];

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "CustomerUpdates/";
  GetAll()
  {
    return this.http.get<IUpdatesCustomerSales[]>(this.localUrl + 'GetAll', this.GlobalAPI.httpOptions);
  }

  GetAllbySales(id)
  {
    return this.http.get<IUpdatesCustomerSales[]>(this.localUrl + 'GetAllbySales/'+id, this.GlobalAPI.httpOptions);
  }
}
