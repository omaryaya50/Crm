import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-check-box-done3',
  templateUrl: './check-box-done3.component.html',
  styleUrls: ['./check-box-done3.component.css']
})
export class CheckBoxDone3Component implements AgRendererComponent {


  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
  //  params.data.amount++;
    params.data.done3 = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }
}
