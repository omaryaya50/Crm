import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-check-box-cancel1',
  templateUrl: './check-box-cancel1.component.html',
  styleUrls: ['./check-box-cancel1.component.css']
})
export class CheckBoxCancel1Component implements AgRendererComponent {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
  //  params.data.amount++;
    params.data.cancle1 = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }
}
