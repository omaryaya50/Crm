import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IVersionQuestionAnswer } from 'src/app/Interfaces/codes-Interfaces/iversion-question-answer';

@Injectable({
  providedIn: 'root'
})
export class VersionQuestionAnswerServiceService {

  VQA:IVersionQuestionAnswer;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "VersionQuestionAnswer/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.VQA, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.VQA, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<IVersionQuestionAnswer[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Getone(index)
  {
    return this.http.get<IVersionQuestionAnswer>(this.localUrl + 'get/'+index, this.GlobalAPI.httpOptions);
  }

  GetByVersion(index)
  {
    return this.http.get<IVersionQuestionAnswer[]>(this.localUrl + 'getByVersion/'+index, this.GlobalAPI.httpOptions);
  }

  RetunAQuestionView(index)
  {
    return this.http.get<IVersionQuestionAnswer[]>(this.localUrl + 'RetunAQuestionView/'+index, this.GlobalAPI.httpOptions);
  }


  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
  DeleteVersion(index)
  {
    return this.http.delete(this.localUrl + 'DeleteVersion/' + index, this.GlobalAPI.httpOptions);
  }

  DeleteQuestion(index)
  {
    return this.http.delete(this.localUrl + 'DeleteQuestion/' + index, this.GlobalAPI.httpOptions);
  }
}
