import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProgram } from 'src/app/Interfaces/security/IProgram';
import { GlobalAPIService } from '../global-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  localUrl = this._GlobalService.URLAPI+'Program/';
  GroupProgram:IProgram
  public GroupProgramList : IProgram[];

  constructor(   
    private http: HttpClient,
    private _GlobalService: GlobalAPIService
  ) { }
    
    showGroupPermission(x):Observable<any>{
      return this.http.get(this.localUrl+'showGroupPermission/'+x)
    }

    SaveGroupPermission(listx):Observable<any>{
      console.log(listx);
      return this.http.post(this.localUrl+'SaveGroupPermission',listx)
    }
}
