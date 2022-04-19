import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Program } from 'src/app/Interfaces/Program.Interface';
import { GlobalAPIService } from '../global-api.service';
@Injectable({
  providedIn: 'root'
})
export class CustClassService {
  //localUrl = 'http://151.106.34.109:7040/api/Program/Get';
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Program/Get";
  getmenu() {
    return this.http.get<Program[]>(this.localUrl, this.GlobalAPI.httpOptions);
  }
}
