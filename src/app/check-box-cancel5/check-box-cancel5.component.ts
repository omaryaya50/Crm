import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-check-box-cancel5',
  templateUrl: './check-box-cancel5.component.html',
  styleUrls: ['./check-box-cancel5.component.css']
})
export class CheckBoxCancel5Component implements AgRendererComponent {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
  //  params.data.amount++;
    params.data.cancel5 = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }
}
