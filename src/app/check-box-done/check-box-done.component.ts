import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-check-box-done',
  templateUrl: './check-box-done.component.html',
  styleUrls: ['./check-box-done.component.css']
})
export class CheckBoxDoneComponent implements AgRendererComponent {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
  //  params.data.amount++;
    params.data.done1 = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }
}
