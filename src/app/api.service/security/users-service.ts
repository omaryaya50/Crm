import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iuser } from 'src/app/Interfaces/security/user-Interface';
import { GlobalAPIService } from '../global-api.service';
import { LoginUser } from 'src/app/Interfaces/security/LoginUser';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // localUrl = 'http://151.106.34.109:7040/api/Auth/';
  public Seruser: Iuser;
  public loginUse:LoginUser;
  constructor(private http: HttpClient, private GlobalAPI: GlobalAPIService) { }

  localUrl = this.GlobalAPI.URLAPI + "Auth/";
  Login(name, password) {
    return this.http.get<Iuser>(this.localUrl + 'login' + '/' + name + '/' + password);
  }

  loginuser() {
    return this.http.post<Iuser>(this.localUrl + 'loginuser',this.loginUse );
  }

  postdata() {
    console.log(this.Seruser.perLevel)
    return this.http.post(this.localUrl + 'register', this.Seruser, this.GlobalAPI.httpOptions);
  }
  putdata() {
    return this.http.put(this.localUrl + 'put', this.Seruser, this.GlobalAPI.httpOptions);
  }

  GetOne(id, val) {
    return this.http.get<Iuser>(this.localUrl + 'getOne/' + id + '/' + val, this.GlobalAPI.httpOptions);
  }

  GetAlldata() {
    return this.http.get(this.localUrl + 'get', this.GlobalAPI.httpOptions);
  }

  GetAllAvailable() {
    return this.http.get(this.localUrl + 'getAvailable', this.GlobalAPI.httpOptions);
  }
  GetAvialableUsersnew(index) {

    return this.http.get(this.localUrl + 'GetAvialableUsersnew/' + index, this.GlobalAPI.httpOptions);
  }
  Delete(index) {
    return this.http.delete(this.localUrl + 'Delete/' + index, this.GlobalAPI.httpOptions);
  }

  ResetPassword(username) {
    return this.http.get(this.localUrl + 'Reset/' + username, this.GlobalAPI.httpOptions);
  }
}
