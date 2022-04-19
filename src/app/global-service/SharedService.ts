import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root' })
export class SharedService {
   
    UserLogin:boolean;
   
    setUserLogin(UserLogin:boolean) {
      this.UserLogin = UserLogin;
    }
    getGlobalVar():boolean{
      return this.UserLogin;
    }
    xxy(): Observable<boolean>|Promise<boolean>|boolean {
        if (localStorage.getItem('login') === null || localStorage.getItem('login').toString().trim() === ''
        )
        {
          return false;
        }
        return true;
      }
  }