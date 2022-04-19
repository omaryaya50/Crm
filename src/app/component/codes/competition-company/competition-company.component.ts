import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompetitionCompanyService } from 'src/app/api.service/codes-service/CompetitionCompany.service';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';
import { ActivatedRoute } from '@angular/router';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';
@Component({
  selector: 'app-competition-company',
  templateUrl: './competition-company.component.html',
  styleUrls: ['./competition-company.component.css']
})
export class CompetitionCompanyComponent implements OnInit {
  rowData: any;
  rowSelection = 'single';
  isSubmitted = false;
  public defaultColDef;
  private gridApi;
  public api: GridApi;
  title: string;
  modalRef: BsModalRef;
  // tslint:disable-next-line: triple-equals
  public Rtl = localStorage.getItem('textDir') == 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    // tslint:disable-next-line: max-line-length
    {headerName: this.Rtl ? 'الكود' : 'competition Company Code', field: 'competitionCompanyId',  width: 200 , sortable: true, filter: true},
   // tslint:disable-next-line: max-line-length
   { headerName: this.Rtl ? 'الوصف العربى' : 'competition Company Name', field: 'competitionCompanyName',  width: 300 , sortable: true, filter: true},
    // tslint:disable-next-line: max-line-length
    {headerName: this.Rtl ? 'الوصف الانجليزى' : 'competition Company LatName', field: 'competitionCompanyLatName',  width: 300 , sortable: true, filter: true}
  ];
  public _IPrgPer:IPrgPer;

  constructor(public obCompetitionCompany: CompetitionCompanyService, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService, private route: ActivatedRoute, public _GroupPermissionService:GroupPermissionService,) {
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
    this.rowData = this.obCompetitionCompany.GetAlldata();
    this.route.data.subscribe(data => {
      this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
       {
         this._IPrgPer=x;
       })
 
     });
  }
  reset()
  {
    this.obCompetitionCompany.obCompetitionCompany =
    {
      competitionCompanyName: null,
      competitionCompanyLatName: null,
      createUserid: null,
      dateAndTime: null,
      competitionCompanyId: 0
    };
    this.gridApi?. deselectAll();
  }
  onSubmit(f: NgForm)
  {
       this.spinner.show();
       this.isSubmitted = f.invalid;
       if (!this.isSubmitted)
    {
      if (this.obCompetitionCompany.obCompetitionCompany.competitionCompanyId == null ||
        this.obCompetitionCompany.obCompetitionCompany.competitionCompanyId  == 0)
        {
this.obCompetitionCompany.postdata().subscribe(res => {
  this.rowData = this.obCompetitionCompany.GetAlldata();
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
  this.obCompetitionCompany.putdata().subscribe(res => {
    this.rowData = this.obCompetitionCompany.GetAlldata();
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
}, 2000);

}
Delete(index: number)
{
  if (confirm('Are you sure to delete')) {
    {
this.obCompetitionCompany. Delete(index).subscribe((data) =>
{
  this.rowData = this.obCompetitionCompany.GetAlldata();
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
  this.obCompetitionCompany.obCompetitionCompany = selectedRows [0]
  }
}
onGridReady(params) {
  this.gridApi = params.api;
  this.rowData = this.obCompetitionCompany.GetAlldata();
}
hide()
{
  this. modalRef.hide();
}
Addnewrecord(template: TemplateRef<any>)
{
  this.reset();
  this.title = 'Add new Record';
  this.modalRef = this.modalService.show(template);
}
UpdateRecord(template: TemplateRef<any>)
{
  const selectedRows = this.gridApi.getSelectedRows();
  if (selectedRows != null && selectedRows.length === 1)
  {
  this.obCompetitionCompany.obCompetitionCompany = selectedRows [0];
  this.title = 'Edit Record ' ;//+ this.obCompetitionCompany.obCompetitionCompany.competitionCompanyLatName;
  this.modalRef = this.modalService.show(template);
  }
  else
  {
    alert('Must select Record to edit');
  }
}
}

