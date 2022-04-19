import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerVisitsService } from '../api.service/codes-service/customer-visits.service';

@Component({
  selector: 'app-btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html',
  styleUrls: ['./btn-cell-renderer.component.css']
})
export class BtnCellRendererComponent implements ICellRendererAngularComp, OnDestroy {
  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }
  constructor( public CustomerVisitsSerc: CustomerVisitsService,public spinner: NgxSpinnerService){

  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    if(confirm("Are you sure to delete Visit ")){
    let selectedData = this.params.api.getSelectedRows();
    if(selectedData!=null && selectedData!= "" )
    {
      this.CustomerVisitsSerc.DeleteVisit(selectedData[0].visitsNo,selectedData[0].customerCode,selectedData[0].versionCode).subscribe(res=>{
        this.params.api.updateRowData({remove: selectedData})  })
       /*  setTimeout(() => {
          this.spinner.hide();
          }, 1000); */
    }
    else{
      alert('you should select row ')
    }

    
    }
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
