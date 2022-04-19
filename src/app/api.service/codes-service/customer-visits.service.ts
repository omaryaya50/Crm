import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerVisits } from 'src/app/Interfaces/codes-Interfaces/icustomer-visits';
import { IVCustomerVisits } from 'src/app/Interfaces/codes-Interfaces/ivcustomer-visits';
import { IcustomerVisits } from 'src/app/Interfaces/View/icustomer-visits';
import { GetAllVisits } from 'src/app/Interfaces/View/get-all-visits';
import { CustimerIDs } from 'src/app/Interfaces/View/custimer-ids';
import { AvRate } from 'src/app/Interfaces/View/av-rate';
import { AvQuestion } from 'src/app/Interfaces/View/av-question';
import { AvPercentage } from 'src/app/Interfaces/View/av-percentage';
import { Icust2 } from 'src/app/Interfaces/View/ICust2';
import { GetAllVisits2 } from 'src/app/Interfaces/View/GetAllVisit2';


@Injectable({
  providedIn: 'root'
})
export class CustomerVisitsService {
  ICustomerVisits: ICustomerVisits;
  IVCustomerVisits: IVCustomerVisits;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "CustomerVisits/";

  getCustomerVisit(Cid, VN, SalesRepID) {
    return this.http.get<ICustomerVisits[]>(this.localUrl + 'getCustomerVisit/' + Cid + '/' + VN + '/' + SalesRepID, this.GlobalAPI.httpOptions);
  }

  GetCustomerVisitQuestions(Cid, VN, SalesRepID) {
    return this.http.get<ICustomerVisits[]>(this.localUrl + 'GetCustomerVisitQuestions/' + Cid + '/' + VN + '/' + SalesRepID, this.GlobalAPI.httpOptions);
  }

  GetTheView() {
    return this.http.get<IVCustomerVisits[]>(this.localUrl + 'GetTheView', this.GlobalAPI.httpOptions);
  }

  GetForView(V, Q) {
    return this.http.get<ICustomerVisits>(this.localUrl + 'GetForView/' + V + '/' + Q, this.GlobalAPI.httpOptions);
  }

  GetSalesCustomers(V) {
    return this.http.get<CustimerIDs[]>(this.localUrl + 'GetSalesCustomers/' + V, this.GlobalAPI.httpOptions);
  }

  GetVisitsByTime(V, Q) {
    return this.http.get<GetAllVisits[]>(this.localUrl + 'GetVisitsByTime/' + V + '/' + Q, this.GlobalAPI.httpOptions);
  }
  GetVisitsByTime2(V, Q) {
    if(V==='')
    return this.http.get<GetAllVisits2[]>(this.localUrl + 'GetVisitsByTime2');
    else
    return this.http.get<GetAllVisits2[]>(this.localUrl + 'GetVisitsByTime2/' + V + '/' + Q, this.GlobalAPI.httpOptions);
  }
  DeleteVisit(V, Q,Z) {
    return this.http.delete<GetAllVisits2[]>(this.localUrl + 'DeleteVisit/' + V + '/' + Q+'/'+Z, this.GlobalAPI.httpOptions);
  }


  GetAllVisits() {
    return this.http.get<GetAllVisits[]>(this.localUrl + 'GetAllVisits', this.GlobalAPI.httpOptions);
  }

  CustomerVisitsView() {
    return this.http.get<IcustomerVisits[]>(this.localUrl + 'CustomerVisitsView', this.GlobalAPI.httpOptions);
  }
  CustomerVisitsView2(Cid,VN,fromdate,todate) {
    return this.http.get<Icust2[]>(this.localUrl + 'CustomerVisitsView2/'+ Cid + '/' + VN+'/'+fromdate+'/'+todate , this.GlobalAPI.httpOptions);
  }
  AvRateProcedure(V) {
    return this.http.get<AvRate[]>(this.localUrl + 'AvRateProcedure/' + V, this.GlobalAPI.httpOptions);
  }

  AvQuestionProcedure(V) {
    return this.http.get<AvQuestion[]>(this.localUrl + 'AvQuestionProcedure/' + V, this.GlobalAPI.httpOptions);
  }

  AvPercentageProcedure(V) {
    return this.http.get<AvPercentage[]>(this.localUrl + 'AvPercentageProcedure/' + V, this.GlobalAPI.httpOptions);
  }
}

