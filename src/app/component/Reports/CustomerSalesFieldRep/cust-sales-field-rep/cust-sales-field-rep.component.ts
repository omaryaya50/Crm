import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CustomerSalesFieldService } from 'src/app/api.service/customer/CustomersalesField-service';
import { SalesFieldService } from 'src/app/api.service/codes-service/SalesField.service';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-cust-sales-field-rep',
  templateUrl: './cust-sales-field-rep.component.html',
  styleUrls: ['./cust-sales-field-rep.component.css']
})
export class CustSalesFieldRepComponent implements OnInit {

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
    FileSaver.saveAs(data, fileName  + EXCEL_EXTENSION);
  }

  ExportExcel(List): void {
    if (this.ReportName != ""&&this.ReportName!=null) {
      this.spinner.show();
      this.exportAsExcelFile(List, this.ReportName);
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
  CustomerClassViewList: any;
  CustomerClassViewListCopy: any;

  FilteredList: any[] = [];
  Total: any;


  rowData: any;
  rowData2: any;
  rowSelection = 'single';

  isSubmitted = false;
  public defaultColDef;
  private gridApi;
  public api: GridApi;
  private gridColumnApi;
  private gridApi2;
  public api2: GridApi;
  title: string;
  modalRef: BsModalRef;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;

  columnDefs = [
 /*    { headerName: this.Rtl ? 'كود العميل' : 'Customer', field: 'customerId', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'العميل' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'القطاع' : 'Territory', field: 'territory', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'اقليم' : 'Sector', field: 'sector', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المحافظه' : 'Governorate', field: 'governorate', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المركز' : 'Address', field: 'region', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'مجالات البيع' : 'Sales Field', field: 'salesFieldName', width: 500, sortable: true, filter: true } */
  ]; 


  columnDefs2 = [
    { headerName: this.Rtl ? 'التصنيف' : 'Sales Field', field: 'salesFieldName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاجمالي' : 'Total', field: 'total', width: 200, sortable: true, filter: true },
  ];

  constructor(public SalesFieldServ: SalesFieldService, public CustomerSalesFieldServ: CustomerSalesFieldService,
    private spinner: NgxSpinnerService, private translate: TranslateService, public SerSalesRep: SalesRepService,
    private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
    this.LoginedGroupIDCustomer = sessionStorage.getItem('GroupID');
    this.LoginedUserIDCustomer = sessionStorage.getItem('ID');


    this.SalesFieldServ.GetAlldata().subscribe(res => {
      this.CustClass = res;
    });
 

  }

  ngOnInit(): void {
 

  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.FilteredList=[];
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);

   

  }

  onGridReady2(params) {

    this.gridApi2 = params.api;

    this.Total = [];
    this.agGrid2.gridOptions.api.setRowData(this.Total);
    this.CustomerSalesFieldServ.totalSalesFieldViews().subscribe(res => {
      this.Total = res;
      this.agGrid2.gridOptions.api.setRowData(this.Total);
    });

  }

  async  Filter() {
    try
    {
    this.FilteredList = [];
    
    this.spinner.show();
 
    if (this.LoginedGroupIDCustomer != 1) {
      this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
        this.LoginedSalesRepID = res;

        this.CustomerSalesFieldServ.SalesManagerCustomerSalesFieldView(this.LoginedSalesRepID).subscribe(res => {
          this.CustomerClassViewList = res;
        });

      });
    }
    else {


      this.CustomerSalesFieldServ.CustomerSalesFieldViews(this.CustID).subscribe(async res => {
        this.CustomerClassViewList = res;
        this.FilteredList = [];
   
      
  
          this.FilteredList = this.CustomerClassViewList;
        await  this.fill ();
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      });

    }

   
   
 
  }
  catch{
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
   
  }
async fill ()
{
var xc=Object.keys(this.FilteredList[0]) 


this.gridApi.setColumnDefs([]);
this.columnDefs=[];
for(let element of xc){

 var xz=element.split(',');

 xz.forEach(element1 => {
  var col= { headerName: element1, field:element1, width: 200, sortable: true, filter: true }
  this.columnDefs.push(col);
 });


};

this.gridApi.setColumnDefs(this.columnDefs);
 await this.agGrid.gridOptions.api.setRowData(this.FilteredList);
}
  onChangeSelectionCustomerClass(selected) {
    this.CustID = parseInt(selected);

  }

}


