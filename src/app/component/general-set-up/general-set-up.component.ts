import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SetUpService } from 'src/app/api.service/security/set-up.service';

@Component({
  selector: 'app-general-set-up',
  templateUrl: './general-set-up.component.html',
  styleUrls: ['./general-set-up.component.css']
})
export class GeneralSetUpComponent implements OnInit {

  Empty: boolean;

  TempData: any;

  rowData: any
  Data: any;
  public defaultColDef;
  private gridApi;
  isSubmitted = false;
  rowSelection = 'single';
  title: string;
  modalRef: BsModalRef;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  public Rtl = localStorage.getItem('textDir') == 'ltr' ? false : true;
  columnDefs = [
    { headerName: this.Rtl ? 'البريد الالكتروني' : 'Sender Mail', field: 'mail', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? ' كلمه المرور' : 'Password', field: 'password', width: 150, sortable: true, filter: true },
    { headerName: this.Rtl ? ' Server' : 'Server', field: 'mailserver', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? ' Port' : 'Port', field: 'port', width: 100, sortable: true, filter: true }
  ];
  constructor(private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService
    , public SetUpServ: SetUpService) { this.defaultColDef = { resizable: true }; }

  ngOnInit(): void {
    this.reset();
    this.rowData = this.SetUpServ.GetAlldata();
  }
  reset() {
    this.SetUpServ._IsetUp =
    {
      mail: null,
      password: null,
      mailserver: null,
      port: 0,

    };
    this.gridApi?.deselectAll();

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.SetUpServ.GetAlldata();

  }
  Addnewrecord(template: TemplateRef<any>) {
    if (this.Empty == true) {
      this.reset();
      this.title = 'Add';
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert("No More Set Ups");
    }

  }

  UpdateRecord(template: TemplateRef<any>) {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.SetUpServ._IsetUp = selectedRows[0];
      this.title = 'Edit';
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert('Must select Record to edit');
    }
  }

  hide() {
    this.modalRef.hide();
  }

  onSelectionChanged(params) {

    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.SetUpServ._IsetUp = selectedRows[0]
    }
  }

  onSubmit(f: NgForm) {


    this.spinner.show();
    this.isSubmitted = f.invalid;
    console.log()

    if (!this.isSubmitted) {

      if (this.Empty == true) {

        this.SetUpServ.postData().subscribe(res => {
          this.rowData = this.SetUpServ.GetAlldata();
          this.checkFun();
          this.hide();
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
      else {

        this.SetUpServ.putData().subscribe(res => {
          this.rowData = this.SetUpServ.GetAlldata();
          this.checkFun();
          this.hide();
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
    }
    setTimeout(() => {

      this.spinner.hide();
    }, 1000);

  }

  Delete(index: string) {
    if (confirm("Are You Sure ?")) {
      this.SetUpServ.Delete(index).subscribe((data) => {
        this.rowData = this.SetUpServ.GetAlldata();
        this.checkFun();
        this.hide();
      });
    }
  }
  checkFun()
  {
    this.SetUpServ.GetAlldata().subscribe(res => {
      this.TempData = res;
      console.log(this.TempData.length);
      if (this.TempData.length == 0) {
        this.Empty = true;
        console.log(this.Empty);

      }
      else {
        this.Empty = false;
        console.log(this.Empty);
      }

    });
  }


}
