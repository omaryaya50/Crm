import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-check-box-cancel3',
  templateUrl: './check-box-cancel3.component.html',
  styleUrls: ['./check-box-cancel3.component.css']
})

export class CheckBoxCancel3Component implements AgRendererComponent {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
  //  params.data.amount++;
    params.data.cancle3 = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }
}
