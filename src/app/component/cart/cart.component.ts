import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Program } from 'src/app/Interfaces/Program.Interface';
import { ProgSericeService } from 'src/app/api.service/prog-serice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    

  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;
  progmenu: Program[] = [];

  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor( public router: Router, private progservice: ProgSericeService) {
    this.getallmenudata();
    this.router.events.subscribe((val) => {
          if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
              this.toggleSidebar();
          }
      });
  }
getallmenudata()
{
    this.progservice.getmenu(localStorage.getItem('id'))
    .subscribe(data => {
        console.log(this.progmenu)
        this.progmenu = data;
        });
      }

  ngOnInit() {
      this.isActive = false;
      this.collapsed = false;
      this.showMenu = '';
      this.pushRightClass = 'push-right';
  }
  getchidList(progid)
  {
      return this.progmenu.filter(x => x.parentID == progid);
  }
  getParentList()
  {
return this.progmenu.filter(x => x.parentID == 0);
  }
  eventCalled() {
      this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
      if (element === this.showMenu) {
          this.showMenu = '0';
      } else {
          this.showMenu = element;
      }
  }

  toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
      const dom: Element = document.querySelector('body');
      return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle('rtl');
  }

  onLoggedout() {
      localStorage.removeItem('isLoggedin');
  }
}
