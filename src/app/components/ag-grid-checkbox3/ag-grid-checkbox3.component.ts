import { Component, OnInit } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';


@Component({
  selector: 'app-ag-grid-checkbox3',
  templateUrl: './ag-grid-checkbox3.component.html',
  styleUrls: ['./ag-grid-checkbox3.component.css']
})
export class AgGridCheckbox3Component implements AgRendererComponent {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
   // params.data.amount++;
    params.data.delete = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }
}