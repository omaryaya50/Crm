import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IAnswerChoises } from 'src/app/Interfaces/codes-Interfaces/ianswer-choises';

@Injectable({
  providedIn: 'root'
})
export class AnswerChoisesServiceService {

  AnswerChoise:IAnswerChoises;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "AnswerChoise/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.AnswerChoise, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.AnswerChoise, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<IAnswerChoises[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Getone(index)
  {
    return this.http.get<IAnswerChoises>(this.localUrl + 'get/'+index, this.GlobalAPI.httpOptions);
  }

  GetByAnswer(index)
  {
    return this.http.get<IAnswerChoises[]>(this.localUrl + 'getByAnswer/'+index, this.GlobalAPI.httpOptions);
  }

  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }

  DeleteAnswer(index)
  {
    return this.http.delete(this.localUrl + 'DeleteAnswer/' + index, this.GlobalAPI.httpOptions);
  }
}
