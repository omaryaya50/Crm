import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserSave } from 'src/app/_interface/security/UserSave';
import { GlobalService } from '../global.service';
import jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalAPIService } from '../global-api.service';
import { IProgram } from 'src/app/Interfaces/security/IProgram';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public iUser: IUser;
  public IProgram: IProgram;
  public currentUser :any= new BehaviorSubject(null);
  public isAuthed = false;

  localUrl = this._Global.URLAPI + 'user/';
  constructor(
    private _http: HttpClient,
    private _Global: GlobalAPIService,
    private _Router: Router,
  ) {}

  getall() {
    return this._http.get < any[] > (`${this.localUrl}getall`)
  }
  update(passsword) {
    console.log(`${this.localUrl}update/` + passsword);
    return this._http.put < any > (`${this.localUrl}update/` + passsword, this.iUser)
  }
  save(passsword) {
    return this._http.post < any > (`${this.localUrl}save/` + passsword, this.iUser)
  }
  delete(code: any) {
    return this._http.delete(`${this.localUrl}delete/` + code)
  }
  find(code: any):Observable<any> {
    return this._http.get < any[] > (`${this.localUrl}find/` + code)
  }
  login(User: any, Pass: any):Observable<any> {
    return this._http.get < IUserSave > (`${this.localUrl}Login/` + User + "/" + Pass)
  }
  GetPrograms(User: any):Observable<any> {
    return this._http.get < IProgram[] > (`${this.localUrl}GetPrograms/` + User )
  }
  logOut (){
    this.currentUser.next(null);
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("userName")
    localStorage.removeItem("email")
    this._Router.navigate(['/auth/login'])
  }
  saveCurrentUser(){
    let token:any = localStorage.getItem('token');
    this.currentUser.next(jwt_decode(token));
    // console.log("currentUser", this.currentUser)
  }
}
