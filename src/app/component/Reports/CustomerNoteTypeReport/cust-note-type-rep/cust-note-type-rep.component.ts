import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from 'src/app/api.service/customer/customer-service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { NoteTypeService } from 'src/app/api.service/codes-service/NoteType.service';
import { CustomerNoteTypesService } from 'src/app/api.service/customer/CustomerNoteTypes-service';
import { ICustomerNoteTypesView } from 'src/app/Interfaces/View/icustomer-note-types-view';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-cust-note-type-rep',
  templateUrl: './cust-note-type-rep.component.html',
  styleUrls: ['./cust-note-type-rep.component.css']
})
export class CustNoteTypeRepComponent implements OnInit {

  //#region  Excel
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }

  ExportExcel(): void {
    if (this.ReportName != "") {
      this.spinner.show();
      this.exportAsExcelFile(this.FilteredList, this.ReportName);
      this.ReportName = "";
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    else {
      alert("من فضلك ادخل اسم التقرير");
    }

  }
  //#endregion


  LoginedUserIDCustomer: any;
  LoginedGroupIDCustomer: any;
  LoginedSalesRepID: number;

  ReportName: string = "";
  CustClass: any;
  CustID: any = 0;
  CustomerID: any = 0;
  CustomerClassViewList: any;
  FilteredListCopy: any;
  AllCustomers: any;

  FilteredList: any[] = [];
  VisitDetails: any[] = [];
  showSecondGrid: boolean = false;
  selectedobj: ICustomerNoteTypesView;


  rowData: any;
  rowData2: any;
  rowSelection = 'single';

  isSubmitted = false;
  public defaultColDef;
  private gridApi;
  public api: GridApi;
  private gridApi2;
  public gridOptions;
  title: string;

  modalRef: BsModalRef;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGridS') agGridS: AgGridAngular;
  columnDefs = [
    { headerName: this.Rtl ? 'العميل' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المركز' : 'Address', field: 'adress', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'القطاع' : 'Sector', field: 'sector', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المنطقه' : 'Region', field: 'region', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المحافظه' : 'Governorate', field: 'governorate', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'اقليم' : 'Territory', field: 'territory', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المعرض' : 'Company', field: 'company', width: 200, sortable: true, filter: true },

  ];

  columnDefs2 = [

    { headerName: this.Rtl ? 'انواع الملاحظات' : 'Note Type', field: 'noteTypeName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'وصف انواع الملاحظات' : 'Note Types Deception', field: 'noteTypesDeception', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'التاريخ' : 'Date', field: 'trxDate', width: 200, sortable: true, filter: true },
  ];




  constructor(public obserCustomer: CustomerService, public NoteTypeServ: NoteTypeService, public CustomerNoteTypesServ: CustomerNoteTypesService,
    private spinner: NgxSpinnerService, private translate: TranslateService, public SerSalesRep: SalesRepService,
    private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {

    this.LoginedGroupIDCustomer = sessionStorage.getItem('GroupID');
    this.LoginedUserIDCustomer = sessionStorage.getItem('ID');

    /* if (this.LoginedGroupIDCustomer != 1) {
      this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
        this.LoginedSalesRepID = res;

        this.SerSalesRep.getone(this.LoginedSalesRepID).subscribe(res => {

          this.obserCustomer.getSalesManagerCustomers(res.territoryId, res.salesRepId).subscribe(res => {
            this.AllCustomers = res;
          });

        });

      });
    } */
    


      this.obserCustomer.GetAlldata().subscribe(res => {
        this.AllCustomers = res;
      });

    

    this.NoteTypeServ.GetAlldata().subscribe(res => {
      this.CustClass = res;
    });


  }

  onGridReady(params) {
    this.gridApi = params.api;


    if (this.LoginedGroupIDCustomer != 1) {
      this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
        this.LoginedSalesRepID = res;

        this.CustomerNoteTypesServ.SalesManagerCustomerSalesFieldView(this.LoginedSalesRepID).subscribe(res => {
          this.CustomerClassViewList = res;
        });

      });
    }
    else {


      this.CustomerNoteTypesServ.CustomerNoteTypesView().subscribe(res => {
        this.CustomerClassViewList = res;
      });

    }






    this.FilteredList = [];
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  }


  onGridReady2(params) {

    this.gridApi2 = params.api;
    //this.VisitDetails = [];
    this.agGridS.gridOptions.api.setRowData(this.VisitDetails);

  }

  Filter() {
    this.showSecondGrid = false;
    this.FilteredList = [];

    if (this.CustID != 0) {
      this.CustomerClassViewList.forEach(element => {
        if (element.noteTypeId == this.CustID) {
          this.FilteredList.push(element);
        }

      });
    }
    if (this.CustomerID != 0) {
      let CopyFilteredList = this.FilteredList;
      this.FilteredList = [];
      if (this.CustID != 0) {
        CopyFilteredList.forEach(element => {
          if (element.customerId == this.CustomerID) {
            this.FilteredList.push(element);
          }
        })

      }
      else {
        this.CustomerClassViewList.forEach(element => {
          if (element.customerId == this.CustomerID) {
            this.FilteredList.push(element);
          }

        });

      }
    }
    if (this.CustID == 0 && this.CustomerID == 0) {
      this.FilteredList = this.CustomerClassViewList;
    }

    let id = [];
    this.FilteredList.forEach(element => {

      if (!id.includes(element.customerId)) {
        id.push(element.customerId);
      }

    });

    let Copy = this.FilteredList;
    this.FilteredListCopy = this.FilteredList;
    this.FilteredList = [];
    var i = -1;

    id.forEach((idelement, index) => {
      var x = {
        customerId: 0,
        customerName: '',
        adress: '',
        sector: '',
        region: '',
        governorate: '',
        territory: '',
        company: ''
      };
      Copy.forEach(Listelement => {
        if (idelement == Listelement.customerId) {
          if (i != index) {

            x.customerName = Listelement.customerName;
            x.customerId = Listelement.customerId;
            x.adress = Listelement.adress;
            x.sector = Listelement.sector;
            x.region = Listelement.region;
            x.governorate = Listelement.governorate;
            x.territory = Listelement.territory;
            x.company = Listelement.company;

            i = i + 1;
          }
        }
      });
      this.FilteredList.push(x);
    });
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  }

  view() {
    this.VisitDetails = [];
    this.showSecondGrid = false;


    // this.agGridS.gridOptions.api.setRowData(this.VisitDetails);
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedobj = selectedRows[0];

    this.FilteredListCopy.forEach(element => {
      if (this.selectedobj.customerId == element.customerId) {

        let x = {
          noteTypeName: "",
          noteTypesDeception: "",
          trxDate: ""
        }

        x.noteTypeName = element.noteTypeName;
        x.noteTypesDeception = element.noteTypesDeception;
        x.trxDate = element.trxDate;

        this.VisitDetails.push(x);
      }

    });

    console.log(this.VisitDetails);
    this.showSecondGrid = true;

    this.agGridS.api.setRowData(this.VisitDetails)

    // this.agGridS.gridApi2.api.setRowData(this.VisitDetails);

  }

  onChangeSelectionCustomerClass(selected) {
    this.CustID = parseInt(selected);

  }

  onChangeSelectionByCustomer(selected) {
    this.CustomerID = parseInt(selected);

  }

}

