import { Component, OnInit } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';


@Component({
  selector: 'app-ag-grid-checkbox2',
  templateUrl: './ag-grid-checkbox2.component.html',
  styleUrls: ['./ag-grid-checkbox2.component.css']
})
export class AgGridCheckbox2Component implements AgRendererComponent {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
 //   params.data.amount++;
    params.data.edit = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }
}