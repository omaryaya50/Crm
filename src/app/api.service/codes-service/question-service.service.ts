import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IQuestion } from 'src/app/Interfaces/codes-Interfaces/iquestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {
  Question:IQuestion;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Question/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.Question, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.Question, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<IQuestion[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Getone(index)
  {
    return this.http.get<IQuestion>(this.localUrl + 'get/'+index, this.GlobalAPI.httpOptions);
  }
  GetMax()
  {
    return this.http.get<number>(this.localUrl + 'getMax', this.GlobalAPI.httpOptions);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
