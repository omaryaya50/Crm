import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { srCompetitionCompany } from 'src/app/Interfaces/codes-Interfaces/CompetitionCompany.Interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class CompetitionCompanyService {
   //localUrl = 'http://151.106.34.109:7040/api/CompetitionCompany/';
    obCompetitionCompany: srCompetitionCompany;
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

    localUrl = this.GlobalAPI.URLAPI + "CompetitionCompany/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.obCompetitionCompany, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.obCompetitionCompany, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<srCompetitionCompany[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
