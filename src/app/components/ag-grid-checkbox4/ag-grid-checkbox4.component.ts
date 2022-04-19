import { Component, OnInit } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';


@Component({
  selector: 'app-ag-grid-checkbox4',
  templateUrl: './ag-grid-checkbox4.component.html',
  styleUrls: ['./ag-grid-checkbox4.component.css']
})
export class AgGridCheckbox4Component implements AgRendererComponent {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
   // params.data.amount++;
    params.data.read = params.value
    ;
    params.api.refreshCells(params);
    return false;
  }
}