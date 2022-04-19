import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IAnswerTypes } from 'src/app/Interfaces/codes-Interfaces/ianswer-types';

@Injectable({
  providedIn: 'root'
})
export class AnswerTypesServiceService {
  AnswerType:IAnswerTypes

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "AnswerTypes/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.AnswerType, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.AnswerType, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<IAnswerTypes[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Getone(index)
  {
    return this.http.get<IAnswerTypes>(this.localUrl + 'get/'+index, this.GlobalAPI.httpOptions);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
