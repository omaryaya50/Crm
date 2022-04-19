import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-visit-customer-code',
  templateUrl: './visit-customer-code.component.html',
  styleUrls: ['./visit-customer-code.component.css']
})
export class VisitCustomerCodeComponent implements ICellRendererAngularComp  {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh() {
    return false;
  }

}
