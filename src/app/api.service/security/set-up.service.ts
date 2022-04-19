import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IsetUp } from 'src/app/Interfaces/security/iset-up';

@Injectable({
  providedIn: 'root'
})
export class SetUpService {

  _IsetUp:IsetUp;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }
  localUrl = this.GlobalAPI.URLAPI + "GeneralSetUp/";

  GetAlldata()
   {
     return this.http.get<IsetUp[]>(this.localUrl + 'getList', this.GlobalAPI.httpOptions);
   }

   putData()
   {
     return this.http.put(this.localUrl+'put',this._IsetUp, this.GlobalAPI.httpOptions);
   }

   postData()
   {
     return this.http.post(this.localUrl +'post',this._IsetUp, this.GlobalAPI.httpOptions);
   }

   Delete(mail)
   {
     return this.http.delete(this.localUrl + 'Delete/'+mail, this.GlobalAPI.httpOptions);
   }
   SendMail(Tomail)
   {
     return this.http.get(this.localUrl + 'SendMail/'+Tomail, this.GlobalAPI.httpOptions);
   }

   GetOne(mail)
   {
     return this.http.get(this.localUrl + 'get/'+mail, this.GlobalAPI.httpOptions);
   }
}
