import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { VersionServiceService } from 'src/app/api.service/codes-service/version-service.service';
import { CustomerVisitsService } from 'src/app/api.service/codes-service/customer-visits.service';
import { CustomerAvergae } from 'src/app/Interfaces/View/customer-avergae';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-eval-rep',
  templateUrl: './eval-rep.component.html',
  styleUrls: ['./eval-rep.component.css']
})
export class EvalRepComponent implements OnInit {

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

  ExportExcel(List): void {
    if (this.ReportName != "") {
      this.spinner.show();
      this.exportAsExcelFile(List, this.ReportName);
      this.ReportName="";
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    else {
      alert("ادخل اسم التقرير");
    }


  }
  //#endregion
  ReportName: string = "";

  CustClass: any;
  CustID: any = 0;

  FilteredList: any[] = [];

  CustAvItem: CustomerAvergae;

  CustAvlist: CustomerAvergae[] = [];

  rowData: any;
  rowData2: any;
  rowSelection = 'single';

  isSubmitted = false;
  public defaultColDef;
  private gridApi;
  public api: GridApi;

  private gridApi2;
  public api2: GridApi;

  title: string;
  modalRef: BsModalRef;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;
  columnDefs = [
   { headerName: this.Rtl ? 'السؤال' : 'Question Description', field: 'questionName', width: 500, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المتوسط' : 'Average', field: 'average', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'اجمالى عدد الاسئلة  ' : 'questionNo', field: 'questionNo', width: 200, sortable: true, filter: true },
  ];

  columnDefs2 = [
    { headerName: this.Rtl ? 'العميل' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'القطاع' : 'Territory', field: 'territory', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'اقليم' : 'Sector', field: 'sector', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المحافظه' : 'Governorate', field: 'governorate', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المركز' : 'Address', field: 'region', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'متوسط الارقام' : 'Average Rate', field: 'averageRate', width: 150, sortable: true, filter: true },
    { headerName: this.Rtl ? 'متوسط النسبه المئويه' : 'Average Percentae', field: 'averagePercenage', width: 200, sortable: true, filter: true },

  ];

  constructor(public VersionServ: VersionServiceService, public CustomerVisitsServ: CustomerVisitsService,
    private spinner: NgxSpinnerService, private translate: TranslateService,
    private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {

    this.VersionServ.GetAlldata().subscribe(res => {
      this.CustClass = res;
    });

    this.reset();

  }
  reset() {
    this.CustAvItem = {
      customerCode: 0,
      customerLatName: "",
      customerName: "",
      averageRate: 0,
      averagePercenage: 0,
      adress:"",
      sector:"",
      region:"",
      governorate:"",
      territory:"",
      company:""
    }
  }

  onGridReady(params) {

    this.gridApi = params.api;

    this.FilteredList = [];
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);

  }

  onGridReady2(params) {

    this.gridApi2 = params.api;

    this.CustAvlist = [];
    this.agGrid2.gridOptions.api.setRowData(this.CustAvlist);

  }

  Filter() {
    this.spinner.show();
    this.FilteredList = [];
    this.CustAvlist = [];
    this.reset();


    if (this.CustID == 0) {
      alert("من فضلك اختر نموذج");
      this.agGrid.gridOptions.api.setRowData(this.FilteredList);
      this.agGrid2.gridOptions.api.setRowData(this.CustAvlist);
    }
  

    this.CustomerVisitsServ.AvQuestionProcedure(this.CustID).subscribe(res => {
      this.FilteredList = res;
      this.agGrid.gridOptions.api.setRowData(this.FilteredList);

    });

    this.CustomerVisitsServ.AvRateProcedure(this.CustID).subscribe(res => {
      
      this.CustomerVisitsServ.AvPercentageProcedure(this.CustID).subscribe(res2 => {
        
        res.forEach(element => {
          this.CustAvItem.customerCode = element.customerCode;
          this.CustAvItem.customerName = element.customerName;
          this.CustAvItem.customerLatName = element.customerLatName;
          this.CustAvItem.averageRate = element.averageRate;
          this.CustAvItem.adress = element.adress;
          
          this.CustAvItem.sector = element.sectorName;
          
          this.CustAvItem.region = element.regionName;
          
          this.CustAvItem.governorate = element.governorateName;
          
          this.CustAvItem.territory = element.territoryName;
          
          this.CustAvItem.company = element.companyName;

          this.CustAvItem.averagePercenage=0;

          if(res2.length>0)
          {
            res2.forEach(element2 => {
              if (element2.customerCode == element.customerCode) {
                this.CustAvItem.averagePercenage = element2.averagePercenage;
                this.CustAvlist.push(this.CustAvItem);
                this.reset();
              }
            });
          }
          else{
            this.CustAvlist.push(this.CustAvItem);
                this.reset();
          }
         
        });
        this.agGrid2.gridOptions.api.setRowData(this.CustAvlist);
      });
      
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);


  }

  onChangeSelectionCustomerClass(selected) {
    this.CustID = parseInt(selected);

  }

}

