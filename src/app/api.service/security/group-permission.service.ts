import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';
import { GlobalAPIService } from '../global-api.service';
import { IgroupPermission } from './IgroupPermission';

@Injectable({
  providedIn: 'root'
})
export class GroupPermissionService {

  public IgroupPermission: IgroupPermission;
  public iPrgPer:IPrgPer

  constructor(
    private http: HttpClient ,
    private master: GlobalAPIService,
    ) { }

  localUrl = this.master.URLAPI + 'GroupPermission/';
  localUrl2 = this.master.URLAPI + 'PrgPer/';


 
  getuserpermission(groupId):Observable<any>
  {
    return this.http.get<IgroupPermission[]>(this.localUrl + 'GetProgramsDetailByGroupId' + '/' + groupId);
  }
  GetProgpermissionperuser(ProgID,id):Observable<any>
  {
    console.log(id)
    return this.http.get<IPrgPer>(this.localUrl + 'GetProgpermissionperuser' + '/' + ProgID+'/'+id);
  }
  showGroupPermission(x){
    return this.http.get(this.localUrl+'showGroupPermission/'+x)
  }

  SaveGroupPermission(listx):Observable<any>{
    return this.http.post(this.localUrl+'SaveGroupPermission',listx)
  }
  showGroupPermission2(x){
    return this.http.get(this.localUrl2+'showGroupPermission/'+x)
  }

  SaveGroupPermission2(listx):Observable<any>{
    return this.http.post(this.localUrl2+'SaveGroupPermission',listx)
  }
}
