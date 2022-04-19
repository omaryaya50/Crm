import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { ICustomerVisitsFiles } from 'src/app/Interfaces/codes-Interfaces/icustomer-visits-files';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerVisitsFilesService {
  ICustomerVisitsFiles:ICustomerVisitsFiles;
  ICustomerVisitsFilesList:ICustomerVisitsFiles[];

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "CustomerVisitsFile/";
  localUrl2 = this.GlobalAPI.URLAPI + "Auth/";
  getCustomerVisit( Cid ,  Vn ,  VCode)
  {
    return this.http.get<ICustomerVisitsFiles[]>(this.localUrl + 'FindByManyCodes/'+Cid+'/'+Vn+'/'+VCode, this.GlobalAPI.httpOptions);
  }

  public downloadFile(docFile: string): Observable < Blob > {
    return this.http.get(this.localUrl2 + 'DownloadFile/' + docFile, {
        responseType: 'blob'
    });
  }
}
