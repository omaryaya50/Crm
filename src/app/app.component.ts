import { Component, Renderer2, ElementRef, ViewChild, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Observable , of as observableOf, Observer, of} from 'rxjs';
import { LoginActivate } from './component/login/LoginActivate';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {

  collapedSideBar: boolean;
  textDir = '';
  lang = '';
  isLogin: boolean;
    

  constructor(private location: Location, private translate: TranslateService,
              private router: Router
    ) {
          if (localStorage.getItem('Lang') === null || localStorage.getItem('Lang') === '')
      {
        localStorage.setItem('Lang', 'en');
        translate.setDefaultLang('en');
      }
      else {
        this.translate.use(localStorage.getItem('Lang'));
        }

          this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/login') {
          if (sessionStorage.getItem('login') === null || sessionStorage.getItem('login') === ""
         ) {
            this.isLogin = true;
            }
            // tslint:disable-next-line: align
            else {
            this.isLogin = false;
            }
          } else {
            this.isLogin = false;
          }
        }
      });
    }
    ngOnInit(): void {
      if (localStorage.getItem('textDir') == null || localStorage.getItem('textDir') === '')
      {
      localStorage.setItem('textDir', 'ltr');
      this.textDir = localStorage.getItem('textDir');
      }
      else {
      this.textDir = localStorage.getItem('textDir');
      }
      // this.translate.addLangs(['en', 'ar']);
      // this.translate.setDefaultLang('en');

      }

      // switchLang(lang: string) {
      //   const htmlTag = document.getElementsByTagName("html")[0] as HTMLHtmlElement;
      //   htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
      //   htmlTag.lang = lang;
      //   this.translate.use(lang);
      // }


      receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }

    getleft() {
      if (this.isLogin === true) {
      return('-245px');
      }
       else {
       return('0');
      }
    }
    getborder() {
      if (this.isLogin === true) {
      return('0px solid');
      }
    }

    
}
