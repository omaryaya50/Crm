import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SalesFieldService } from 'src/app/api.service/codes-service/SalesField.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';
import { ActivatedRoute } from '@angular/router';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';
@Component({
  selector: 'app-sales-field',
  templateUrl: './sales-field.component.html',
  styleUrls: ['./sales-field.component.css']
})
export class SalesFieldComponent implements OnInit {
  rowData: any;
  rowSelection = 'single';
  
  isSubmitted = false;
  public defaultColDef;
  private gridApi;
  public api: GridApi;
  title: string;
  modalRef: BsModalRef;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {headerName: this.Rtl ? 'الكود' : 'Sales Field Id', field: 'salesFieldId',  width: 150 , sortable: true, filter: true},
   // tslint:disable-next-line: max-line-length
   { headerName: this.Rtl ? 'الوصف العربى' : 'Sales Field Name', field: 'salesFieldName',  width: 300 , sortable: true, filter: true},
    // tslint:disable-next-line: max-line-length
    {headerName: this.Rtl ? 'الوصف الانجليزى' : 'Sales Field Lat Name', field: 'salesFieldLatName',  width: 300 , sortable: true, filter: true}
  ];
  public _IPrgPer:IPrgPer;

  constructor(public obSalesFieldService: SalesFieldService, private spinner: NgxSpinnerService
    ,         private translate: TranslateService,  private modalService: BsModalService, private route: ActivatedRoute, public _GroupPermissionService:GroupPermissionService,) {
    this.defaultColDef = { resizable: true };
    this._IPrgPer=
    {
      delete:false,
      edit:false,
      excel:false,
      insert:false,
      print:false,
      progId:0,
      read:false,
      recordList:false,
      sysId:0,
      userId:0
    }
  }

  ngOnInit( ): void {
    this.reset();
    this.rowData = this.obSalesFieldService.GetAlldata();
    this.route.data.subscribe(data => {
      this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
       {
         this._IPrgPer=x;
       })
 
     });
    
  }
  reset()
  {
    this.obSalesFieldService.obSalesField =
    {
      salesFieldName: null,
      salesFieldLatName: null,
      createUserid: null,
      dateAndTime: null,
      salesFieldId: 0
    };
    this.gridApi?. deselectAll();

  }
  onSubmit(f: NgForm)
  {
       this.spinner.show();
       this.isSubmitted = f.invalid;
       if (!this.isSubmitted)
    {
      if (this.obSalesFieldService.obSalesField.salesFieldId == null ||
        // tslint:disable-next-line: triple-equals
        this.obSalesFieldService.obSalesField.salesFieldId == 0)
        {
this.obSalesFieldService.postdata().subscribe(res => {
  this.rowData = this.obSalesFieldService.GetAlldata();
  this.hide();
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);

}
, err => {
console.log(err);
setTimeout(() => {

  this.spinner.hide();
}, 2000);
});
}
else{
  this.obSalesFieldService.putdata().subscribe(res => {
    this.rowData = this.obSalesFieldService.GetAlldata();
    this.hide();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  , err => {
  console.log(err);
  setTimeout(() => {
    this.spinner.hide();
  }, 2000);
  } );
}
    }
       setTimeout(() => {

  this.spinner.hide();
}, 1000);

}
Delete(index: number)
{
  if (confirm('Are you sure to delete')) {
    {
this.obSalesFieldService. Delete(index).subscribe((data) =>
{
  this.rowData = this.obSalesFieldService.GetAlldata();
  this.hide();
    }

);
}
  }
}
deleteSelectedRows() {
  const alertRow  = this.gridApi.getSelectedRows();
  this.agGrid.api.updateRowData({remove: [alertRow[0]]});
  this.reset();
}
onSelectionChanged(params) {

  const selectedRows = this.gridApi.getSelectedRows();
  if (selectedRows != null && selectedRows.length === 1)
  {
  this.obSalesFieldService.obSalesField = selectedRows [0]
  }
}
onGridReady(params) {
  this.gridApi = params.api;
  this.rowData = this.obSalesFieldService.GetAlldata();
}
hide()
{
  this. modalRef.hide();
}
Addnewrecord(template: TemplateRef<any>)
{
  this.reset();
  this.title = 'Add';
  this.modalRef = this.modalService.show(template);
}
UpdateRecord(template: TemplateRef<any>)
{
  const selectedRows = this.gridApi.getSelectedRows();
  if (selectedRows != null && selectedRows.length === 1)
  {
    this.obSalesFieldService.obSalesField  = selectedRows [0];
    this.title = 'Edit';// + this.obSalesFieldService.obSalesField.salesFieldLatName ;
    this.modalRef = this.modalService.show(template);
  }
  else
  {
    alert('Must select Record to edit');
  }
}
}
