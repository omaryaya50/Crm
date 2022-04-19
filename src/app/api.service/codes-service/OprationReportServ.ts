import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalAPIService } from "../global-api.service";

@Injectable({
    providedIn: 'root'
  })
  export class OprationReportServ {
    //localUrl = 'http://151.106.34.109:7040/api/NoteType/';
    constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }
  
    localUrl = this.GlobalAPI.URLAPI + "NoteType/"
    
  }