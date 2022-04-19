import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Program } from '../Interfaces/Program.Interface';
import { GlobalAPIService } from './global-api.service';
import { IVisitScheduals } from '../Interfaces/IVisitScheduals';
import { visitSchedualSaveList } from '../Interfaces/View/visitSchedualSaveList';
@Injectable({
  providedIn: 'root'
})
export class VisitSchedualsServ {
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }
public iVisitScheduals:IVisitScheduals
public iVisitSchedualslist:visitSchedualSaveList[]


    localUrl = this.GlobalAPI.URLAPI + "CustomerVisitSchedule/";
  httpOptions2 = {
        headers: new HttpHeaders(
            {
              Authorization: `Bearer ` + localStorage.getItem('jwt'),
            }
        )
      };

      findAll(){
        return this.http.get(this.localUrl + 'findAll', this.GlobalAPI.httpOptions);

      }
      findAll2(x,y){
        return this.http.get(this.localUrl + 'findAll/'+ x+'/'+y , this.GlobalAPI.httpOptions);

      }
      Save(){
        console.log(this.iVisitSchedualslist)
        return this.http.post(this.localUrl + 'save', this.iVisitSchedualslist,this.GlobalAPI.httpOptions);

      }
}
