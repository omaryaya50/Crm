import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  public x: string;
  public links = new Array<{ text: string, path: string, progid: number, parentid: number }>();
  constructor(private router: ActivatedRoute) {


    this.links.push({ text: "Goods", path: "Goods", progid: 620, parentid: 601 });
    this.links.push({ text: "Cart", path: "Cart", progid: 6020, parentid: 602 });
    this.links.push({ text: "Cart", path: "Cart", progid: 6020, parentid: 602 });
    this.links.push({ text: "Cart", path: "Cart", progid: 6020, parentid: 602 });
    this.links.push({ text: "Cart", path: "Cart", progid: 6020, parentid: 602 });
    this.router.paramMap.subscribe(parms => this.x = parms.get('id'));
  }

  ngOnInit(): void {
    console.log(this.links);
  }
  getchidList() {

    return this.links.filter(x => x.parentid.toString() == this.x);
  }
}
