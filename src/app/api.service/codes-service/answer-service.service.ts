import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IAnswer } from 'src/app/Interfaces/codes-Interfaces/ianswer';

@Injectable({
  providedIn: 'root'
})
export class AnswerServiceService {
  Answer:IAnswer;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Answer/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.Answer, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.Answer, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<IAnswer[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Getone(index)
  {
    return this.http.get<IAnswer>(this.localUrl + 'get/'+index, this.GlobalAPI.httpOptions);
  }

  GetByQuestion(index)
  {
    return this.http.get<IAnswer>(this.localUrl + 'getByQuestion/'+index, this.GlobalAPI.httpOptions);
  }

  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
  DeleteQuestion(index)
  {
    return this.http.delete(this.localUrl + 'DeleteQuestion/' + index, this.GlobalAPI.httpOptions);
  }
}
