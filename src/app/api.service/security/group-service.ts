import { Igroup } from 'src/app/Interfaces/security/group-Interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
    providedIn: 'root'
  })
export class GroupService {
    //localUrl = 'http://151.106.34.109:7040/api/Groups/';
   Sergroup: Igroup;
   SergroupList:Igroup[];
   constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "Groups/";
      httpOptions2 = {
      headers: new HttpHeaders(
          {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }
      )
    };
   GetAlldata()
   {
     return this.http.get<Igroup[]>(this.localUrl + 'get', this.httpOptions2);
   }
   Getdata()
   {
     return this.http.get(this.localUrl + 'get',  this.httpOptions2);
   }
   putData()
   {
     return this.http.put(this.localUrl+'put',this.Sergroup,  this.httpOptions2);
   }

   postData()
   {
     return this.http.post(this.localUrl + 'post',this.Sergroup, this.httpOptions2);
   }
   Delete(index)
   {
     return this.http.delete(this.localUrl + 'Delete/'+index,  this.httpOptions2);
   }
   GetOne(index){
     return this.http.get(this.localUrl+'get/'+index,  this.httpOptions2);
   }

   

 }
