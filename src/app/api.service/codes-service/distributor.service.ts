import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDistributor } from 'src/app/Interfaces/codes-Interfaces/i-distributor';
import { GlobalAPIService } from '../global-api.service';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  Distributor :IDistributor;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Distributor/";
  postdata()
  {
    return this.http.post<IDistributor>(this.localUrl + 'Save', this.Distributor, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put<IDistributor>(this.localUrl + 'Update', this.Distributor, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<IDistributor[]>(this.localUrl + 'Get', this.GlobalAPI.httpOptions);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
