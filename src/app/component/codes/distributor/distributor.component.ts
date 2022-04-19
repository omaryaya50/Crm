import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { DistributorService } from 'src/app/api.service/codes-service/distributor.service';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

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
    { headerName: this.Rtl ? 'الكود' : 'Distributor Code', field: 'distributorCode', width: 150, sortable: true, filter: true },
    // tslint:disable-next-line: max-line-length
    { headerName: this.Rtl ? 'الوصف العربى' : 'Distributor Name', field: 'distributorName', width: 300, sortable: true, filter: true },
    // tslint:disable-next-line: max-line-length
    { headerName: this.Rtl ? 'الوصف الانجليزى' : 'Distributor Lat Name', field: 'distributorLatName', width: 300, sortable: true, filter: true }
  ];
  public _IPrgPer:IPrgPer;


  constructor(public DistributorServ: DistributorService, private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService, private route: ActivatedRoute, public _GroupPermissionService:GroupPermissionService,) {
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

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
       {
         this._IPrgPer=x;
       })
 
     });
  }


  reset() {
    this.DistributorServ.Distributor =
    {
      distributorCode: 0,
      distributorName: "",
      distributorLatName: "",
    };
    this.gridApi?.deselectAll();
  }

  UpdateRecord(template: TemplateRef<any>) {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.DistributorServ.Distributor = selectedRows[0];
      // console.log(this.DistributorServ.Agent);
      this.title = 'Edit Distributor';
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert('Must select Record to edit');
    }
  }

  Addnewrecord(template: TemplateRef<any>) {
    this.reset();
    this.title = 'Add Distributor';
    this.modalRef = this.modalService.show(template);
  }

  hide() {
    this.modalRef.hide();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.DistributorServ.GetAlldata();
  }

  onSelectionChanged(params) {


    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.DistributorServ.Distributor = selectedRows[0]
    }
  }

  deleteSelectedRows() {
    const alertRow = this.gridApi.getSelectedRows();
    this.agGrid.api.updateRowData({ remove: [alertRow[0]] });
    this.reset();
  }

  Delete(index: number) {
    if (confirm('Are you sure to delete')) {
      {
        this.DistributorServ.Delete(index).subscribe((data) => {
          this.rowData = this.DistributorServ.GetAlldata();
          this.hide();
        }

        );
      }
    }
  }

  onSubmit(f: NgForm) {
    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {
      if (this.DistributorServ.Distributor.distributorCode == 0) {

        this.DistributorServ.postdata().subscribe(res => {

          this.rowData = this.DistributorServ.GetAlldata();
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
      else {
        this.DistributorServ.putdata().subscribe(res => {
          this.rowData = this.DistributorServ.GetAlldata();
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
    }
    setTimeout(() => {

      this.spinner.hide();
    }, 1000);

  }

}
