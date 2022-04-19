import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalAPIService } from '../global-api.service';
import { IAgent } from 'src/app/Interfaces/codes-Interfaces/iagent';
import { IiAgent } from 'src/app/Interfaces/codes-Interfaces/ii-agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  Agent :IAgent;
  IAgent :IiAgent;

  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Agent/";
  postdata()
  {
    return this.http.post(this.localUrl + 'post', this.IAgent, this.GlobalAPI.httpOptions);
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.Agent, this.GlobalAPI.httpOptions);
  }
  GetAlldata()
  {
    return this.http.get<IAgent[]>(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }
  Delete(index)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }
}
