
import { Component, OnInit , ViewChild, TemplateRef} from '@angular/core';
import { GroupService } from 'src/app/api.service/security/group-service';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  rowData:any
  Data:any;
  public defaultColDef;
  private gridApi;
  isSubmitted = false;
  rowSelection = 'single';
  title: string;
  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  public Rtl = localStorage.getItem('textDir') == 'ltr' ? false : true;
  columnDefs = [
    {headerName: this.Rtl ? 'id' : 'id', field: 'groupId',  width: 0 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم العربى' : 'Group Name', field: 'groupName',  width: 150 , sortable: true, filter: true},
    {headerName: this.Rtl ? 'الاسم الانجليزى' : 'Group Lat Name', field: 'groupLatName',  width: 200 , sortable: true, filter: true}
  ];
  
  constructor(public GroupServ:GroupService, private spinner: NgxSpinnerService
    ,         private translate: TranslateService, private modalService: BsModalService) { 
      this.defaultColDef = { resizable: true };
       
  }
  ngOnInit(): void {
    this.reset();
    this.rowData=this.GroupServ.Getdata();
    //console.log(this.rowData);
  }
  
  reset()
  {
    this.GroupServ.Sergroup =
    {
      groupName: null,
      groupLatName: null,
      groupId: 0,

    };
    this.gridApi?. deselectAll();

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData=this.GroupServ.Getdata();
    
  }
  Addnewrecord(template: TemplateRef<any>)
  {
    //console.log(this.rowData);
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
  }
  UpdateRecord(template: TemplateRef<any>)
  {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
    this.GroupServ.Sergroup = selectedRows [0];
    this.title = 'Edit' ;
    this.modalRef = this.modalService.show(template);
    }
    else
    {
      alert('Must select Record to edit');
    }
  }
  onSelectionChanged(params) {

    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1)
    {
    this.GroupServ.Sergroup = selectedRows [0]
    }
  }
  hide()
  {
    this. modalRef.hide();
  }
  onSubmit(f: NgForm)
  {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted)
    {

      if (this.GroupServ.Sergroup.groupId == null || this.GroupServ.Sergroup.groupId == 0)
      {
              
        this.GroupServ.postData().subscribe(res => {
        this.rowData=this.GroupServ.Getdata();
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
      else
      {

        this.GroupServ.putData().subscribe(res => {
          this.rowData=this.GroupServ.Getdata().subscribe();
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

  Delete(index: number)
  {
    if(confirm("Are You Sure ?"))
    {
      this.GroupServ.Delete(index).subscribe((data) =>
      {
        this.rowData=this.GroupServ.Getdata();
        this.hide();
      });
    }
     
  }
}
