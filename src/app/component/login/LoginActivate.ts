import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgSericeService } from 'src/app/api.service/prog-serice.service';
import { Program } from 'src/app/Interfaces/Program.Interface';

@Injectable()
export class LoginActivate implements CanActivate {
  login?: string ;
  progmenu: Program[] = [];
  constructor(private router: Router, private progservice: ProgSericeService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (sessionStorage.getItem('login') === null || sessionStorage.getItem('login').toString().trim() === ''
    )
    {
      this.router.navigate(['login']);
    }
    if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt').toString().trim() === ''
    )
    {
      this.router.navigate(['login']);
    }
    if (route.url != null && route.url.toString() != ''&&
    sessionStorage.getItem('login') != null && sessionStorage.getItem('login').toString().trim() != '')
  {
   /*  this.progservice.getmenu(sessionStorage.getItem('login'))
      .subscribe(data => {
        console.log(sessionStorage.getItem('login'))
        this.progmenu = data;
        console.log( this.progmenu)
          });
    const x =    this.progmenu.filter(person=> 
            // tslint:disable-next-line: triple-equals
            person.url.toString().replace('/','').toLowerCase() == route.url.toString().replace(',','').replace('/','').toLowerCase());
            if(x==null||x.length<1)
            {
             this.router.navigate(['']);
           
            } */
    return true;
  }
    return true;
  }
  xxy(): Observable<boolean>|Promise<boolean>|boolean {
    if (sessionStorage.getItem('login') === null || sessionStorage.getItem('login').toString().trim() === ''
    )
    {
      return false;
    }
    return true;
  }
}