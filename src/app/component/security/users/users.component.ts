
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/api.service/security/users-service';
import { GroupService } from 'src/app/api.service/security/group-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  rowData: any;
  groups: any;
  rowSelection = 'single';
  isSubmitted = false;
  public defaultColDef;
  private gridApi;
  title: string;
  modalRef: BsModalRef;
  // tslint:disable-next-line: triple-equals
  public Rtl = localStorage.getItem('textDir') == 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {headerName: this.Rtl ? 'id' : 'id', field: 'id',  width: 0 , sortable: true, filter: true},
   // tslint:disable-next-line: max-line-length
   { headerName: this.Rtl ? 'البريد الالكتروني' : 'Email', field: 'userName',  width: 250 , sortable: true, filter: true},
   { headerName: this.Rtl ? 'الاسم العربى' : 'User Name', field: 'name',  width: 150 , sortable: true, filter: true},
   { headerName: this.Rtl ? 'الاسم الانجليزى' : 'User Lat Name', field: 'nameLat',  width: 150 , sortable: true, filter: true},
   { headerName: this.Rtl ? 'التليفون' : 'mobile', field: 'mobile',  width: 150 , sortable: true, filter: true},
  ];
  constructor(public obserUser: UserService, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService ,
              public objGroupService: GroupService) {
    this.defaultColDef = { resizable: true };
    this.objGroupService.GetAlldata().subscribe(orders => {
      this.groups = orders;
    });
  }
  onChangeSelection(selected) {
    // tslint:disable-next-line: radix
    this. obserUser.Seruser.groupId = parseInt( selected ) ;
 }
  ngOnInit( ): void {
    this.reset();
    this.rowData = this.obserUser.GetAlldata();
  }
  reset()
  {
    this.obserUser.Seruser =
    {
      name: null,
      userName: null,
      mobile1: null,
      mobile: null,
      id: 0,
      address: null,
      nameLat: null,
      groupId : 0,
      password: '',
      xToken:'',
      perLevel:0,

    };
    this.gridApi?. deselectAll();

  }
  onChangePerLevel(event){
    alert(event)
    this.obserUser.Seruser.perLevel=event
  }
  onSubmit(f: NgForm)
  {
       this.spinner.show();
       this.isSubmitted = f.invalid;
       if(typeof this.obserUser.Seruser.perLevel != "number")
       {
        this.obserUser.Seruser.perLevel  = Number.parseInt(this.obserUser.Seruser.perLevel );
       }
       if (!this.isSubmitted)
    {
      if (this.obserUser.Seruser.id == null || this.obserUser.Seruser.id == 0)
        {
          if ( this.obserUser.Seruser.password == null || this.obserUser.Seruser.password === '') {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
            return;

          }
          console.log(this.obserUser.Seruser)

          this.obserUser.postdata().subscribe(res => {
            console.log(this.obserUser.Seruser.perLevel)
            this.rowData = this.obserUser.GetAlldata();
  this. hide();
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);

}
, err => {
console.log(err);
setTimeout(() => {

  this.spinner.hide();
}, 1000);
});
}
else{
  this.obserUser.putdata().subscribe(res => {
    this.rowData = this.obserUser.GetAlldata();
    this. hide();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  , err => {
  console.log(err);
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
  } );
}
    }
       setTimeout(() => {

  this.spinner.hide();
}, 1000);

}
Delete(index: string)
{
  if (confirm('Are you sure to delete')) {
    {
this.obserUser. Delete(index).subscribe((data) =>
{
  this.rowData = this.obserUser.GetAlldata();
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
  this.obserUser.Seruser = selectedRows [0]
  }
}
onGridReady(params) {
  this.gridApi = params.api;
  this.rowData = this.obserUser.GetAlldata();
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
  this.obserUser.Seruser = selectedRows [0];
  this.title = 'Edit';
  this.modalRef = this.modalService.show(template);
  }
  else
  {
    alert('Must select Record to edit');
  }
}

}
