import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerVisitsChoises } from 'src/app/Interfaces/codes-Interfaces/icustomer-visits-choises';

@Injectable({
  providedIn: 'root'
})
export class CustomerVisitsChoisesService {
  ICustomerVisitsChoises:ICustomerVisitsChoises;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "CustomerVisitsChoises/";

  FindByQuestion( Q , C , V )
  {
    return this.http.get<ICustomerVisitsChoises[]>(this.localUrl + 'getByQuestion/'+Q+'/'+C +'/'+V, this.GlobalAPI.httpOptions);
  }
}
