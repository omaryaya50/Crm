import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InNoteType } from 'src/app/Interfaces/codes-Interfaces/NoteType.Interface';
import { GlobalAPIService } from '../global-api.service';

@Injectable({
  providedIn: 'root'
})
export class NoteTypeService {
  //localUrl = 'http://151.106.34.109:7040/api/NoteType/';
  obInNoteType: InNoteType;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "NoteType/";
  postdata() {
    return this.http.post(this.localUrl + 'post', this.obInNoteType, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.obInNoteType, this.GlobalAPI.httpOptions);
  }
  GetAlldata() {
    return this.http.get<InNoteType[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
