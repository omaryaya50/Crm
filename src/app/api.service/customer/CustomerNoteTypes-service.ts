import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerNoteTypes } from 'src/app/Interfaces/customer/ICustomerNoteTypes';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerNoteTypesView } from 'src/app/Interfaces/View/icustomer-note-types-view';

@Injectable({
  providedIn: 'root'
})

export class CustomerNoteTypesService {
  //localUrl = 'http://151.106.34.109:7040/api/CustomerNoteType/';
  obICustomerNoteTypes: ICustomerNoteTypes[];
  oboneCustomerNoteTypes: ICustomerNoteTypes;
  OldNoteType: ICustomerNoteTypes[];
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "CustomerNoteType/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obICustomerNoteTypes, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obICustomerNoteTypes, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<ICustomerNoteTypes[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }

  SalesManagerCustomerSalesFieldView(Sid) {
    return this.http.get<ICustomerNoteTypesView[]>(this.localUrl + 'SalesManagerCustomerSalesFieldView/'+Sid, this.GlobalAPI.httpOptions);
  }


  CustomerNoteTypesView() {
    return this.http.get<ICustomerNoteTypesView[]>(this.localUrl + 'CustomerNoteTypesView', this.GlobalAPI.httpOptions);
  }
  getone(index) {
    return this.http.get<ICustomerNoteTypes[]>(this.localUrl + 'get/' + index, this.GlobalAPI.httpOptions);
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
