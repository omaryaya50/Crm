import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-check-box-done4',
  templateUrl: './check-box-done4.component.html',
  styleUrls: ['./check-box-done4.component.css']
})
export class CheckBoxDone4Component implements AgRendererComponent {

  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
  //  params.data.amount++;
    params.data.done4 = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }
}

