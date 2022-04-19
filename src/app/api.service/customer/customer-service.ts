import { Injectable } from '@angular/core';
import { Icustomer } from 'src/app/Interfaces/customer/Icustomer';
import { HttpClient } from '@angular/common/http';
import { ICustomerView } from 'src/app/Interfaces/customer/icustomer-view';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerClassView } from 'src/app/Interfaces/View/icustomer-class-view';
import { TotalClass } from 'src/app/Interfaces/View/total-class';
import { CustomersalesView } from 'src/app/Interfaces/customer/customersales-view';
import { Icustfilter, IcustfilterSales } from 'src/app/Interfaces/customer/Icustfilter';
import { Icustmap } from 'src/app/Interfaces/codes-Interfaces/Icustmap';
import { CustomerFilter } from 'src/app/Interfaces/customer/CustomerFilter';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  //localUrl = 'http://localhost:5000/api/Customer/';
  obIcustomer: Icustomer;
  objICustomerView: ICustomerView;
  objfiltercust :Icustfilter;
  objfiltercustseles :IcustfilterSales;
  OldCustomer: Icustomer;
 public ICustomerFilter:CustomerFilter
  CustomerListMap: Icustomer[];
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Customer/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obIcustomer, this.GlobalAPI.httpOptions);
  }
  custfilter(){
    return this.http.post(this.localUrl + 'postcustfilter', this.objfiltercust, this.GlobalAPI.httpOptions);
  }
  FindByMap(listcust){
    return this.http.post<Icustmap[]>(this.localUrl + 'FindByMap', this.objfiltercust, this.GlobalAPI.httpOptions);
  }
  FindByMapSales(listcust){
    return this.http.post<Icustmap[]>(this.localUrl + 'FindByMapSales', this.objfiltercustseles, this.GlobalAPI.httpOptions);
  }
  
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obIcustomer, this.GlobalAPI.httpOptions);
  }


  UpdateSalesRep(listcust) {
    return this.http.put<Icustomer[]>(this.localUrl + 'UpdateSalesRep',listcust, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<Icustomer[]>(this.localUrl + 'get'
    , this.GlobalAPI.httpOptions);
  }


  GetView() {
    return this.http.get<ICustomerView[]>(this.localUrl + 'GetCustomersView', this.GlobalAPI.httpOptions);
  }

  SalesManagerCustomerClassView(Sid) {
    return this.http.get<ICustomerClassView[]>(this.localUrl + 'SalesManagerCustomerClassView/'+Sid, this.GlobalAPI.httpOptions);
  }

  CustomerClassView() {
    return this.http.get<ICustomerClassView[]>(this.localUrl + 'CustomerClassView', this.GlobalAPI.httpOptions);
  }

  totalClassification() {
    return this.http.get<TotalClass[]>(this.localUrl + 'totalClassification', this.GlobalAPI.httpOptions);
  }

  getone(index) {
    return this.http.get<Icustomer>(this.localUrl + 'get' + '/' + index, this.GlobalAPI.httpOptions);
  }

  GetByActualID(index) {
    return this.http.get<Icustomer>(this.localUrl + 'GetByActualID' + '/' + index, this.GlobalAPI.httpOptions);
  }

  getCustomersBySalesRep(index) {
    return this.http.get<Icustomer[]>(this.localUrl + 'FindCustomers' + '/' + index, this.GlobalAPI.httpOptions);
  }
  getCustomersBySalesRep2(index,index2) {
    return this.http.get<Icustomer[]>(this.localUrl + 'FindCustomers2' + '/' + index+'/'+index2, this.GlobalAPI.httpOptions);
  }
  GetCustByLevel() {
    return this.http.get<Icustomer[]>(this.localUrl + 'GetCustByLevel' , this.GlobalAPI.httpOptions);
  }


  getByStatus(index) {
    // return this.http.get<Icustomer[]>(this.localUrl + 'getByStatus' + '/' + index);
    return this.http.get<CustomersalesView[]>(this.localUrl + 'GetallByStatusView' + '/' + index+ this.GlobalAPI.httpOptions);
  }

  GetallByTerritory(index) {
    return this.http.get<Icustomer[]>(this.localUrl + 'GetallByTerritory' + '/' + index, this.GlobalAPI.httpOptions);
  }

  getSalesManagerCustomers(T , S) {
    return this.http.get<Icustomer[]>(this.localUrl + 'getSalesManagerCustomers' + '/' + T +'/'+S, this.GlobalAPI.httpOptions);
  }


  getMax() {
    return this.http.get<number>(this.localUrl + 'getMax', this.GlobalAPI.httpOptions);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }

  getMaxStatus() {
    return this.http.get<number>(this.localUrl + 'getMaxStatus', this.GlobalAPI.httpOptions);
  }
  GetProductView(ICustomerFilter){
    return this.http.post(this.localUrl + 'GetProductView', ICustomerFilter,this.GlobalAPI.httpOptions);

  }
}
