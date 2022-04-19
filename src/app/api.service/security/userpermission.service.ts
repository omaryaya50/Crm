import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProgram } from 'src/app/Interfaces/security/IProgram';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class UserpermissionService {


  localUrl = this._GlobalService.URLAPI+'PrgPer/';
  GroupProgram:IProgram
  public GroupProgramList : IProgram[];

  constructor(   
    private http: HttpClient,
    private _GlobalService: GlobalAPIService
  ) { }
    
    showGroupPermission(userid):Observable<any>{
      console.log(this.localUrl+'showGroupPermission/'+userid)
      return this.http.get(this.localUrl+'showGroupPermission/'+userid)
    }

    SaveGroupPermission(listx):Observable<any>{
      return this.http.post(this.localUrl+'SaveGroupPermission',listx)
    }
}
