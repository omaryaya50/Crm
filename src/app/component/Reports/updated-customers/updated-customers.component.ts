import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { UpdatesCustomersService } from 'src/app/api.service/codes-service/updates-customers.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-updated-customers',
  templateUrl: './updated-customers.component.html',
  styleUrls: ['./updated-customers.component.css']
})
export class UpdatedCustomersComponent implements OnInit {

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
  ReportName: string = "";

  AllSales: any;
  SalesID: number;
  FromDate: any;
  ToDate: any;
  FilteredList: any[];
  AllFilteredList: any[];
  SalesFilterdList:any[];
  public defaultColDef;

  private gridApi;
  public api: GridApi;
  rowData: any;
  rowSelection = 'single';

  modalRef: BsModalRef;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { headerName: this.Rtl ? 'كود العميل' : 'Customer ID', field: 'customerId', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'العميل ' : 'Customer Name ', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'كود المندوب' : 'Sales Representative ID', field: 'salesRepId', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المندوب ' : 'Sales Representative', field: 'salesRepName', width: 200, sortable: true, filter: true },
    {
      headerName: this.Rtl ? 'التاريخ' : 'Date', field: 'dateAndTime', width: 200, sortable: true, filter: true,
      cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleString() : '';
      }
    }
  ];

  constructor(public UpdatesCustomersServ: UpdatesCustomersService, public SalesRepServ: SalesRepService,
    private spinner: NgxSpinnerService, private translate: TranslateService,
    private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {

    this.ToDate = new Date().toJSON().slice(0, 10);

    this.SalesRepServ.GetAlldata().subscribe(res => {
      this.AllSales = res;
    });

    this.GetAll();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.FilteredList = [];
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  }

  GetAll() {
    this.UpdatesCustomersServ.GetAll().subscribe(res => {
      this.AllFilteredList = res;
    });
  }

  onChangeSelectionCustomerBySalesID(selected) {
    this.SalesFilterdList = [];
    this.SalesID = parseInt(selected);
    this.UpdatesCustomersServ.GetAllbySales(this.SalesID).subscribe(res => {
      this.SalesFilterdList = res;
    });
  }

  Filter() {
    
    this.FilteredList = [];
    if (this.SalesID == null && this.FromDate == null) {
      this.FilteredList = this.AllFilteredList;
    }
    else if (this.SalesID != null && this.FromDate == null) {
     this.FilteredList=this.SalesFilterdList;
    }
    else if (this.FromDate != null) {
      var CopyList
      if (this.AllFilteredList.length != 0 && this.SalesID == null) {
        CopyList = this.AllFilteredList;
      }
      else {
        CopyList = this.SalesFilterdList;
      }
      CopyList.forEach(element => {
        var Datee = new Date(element.dateAndTime).toJSON().slice(0, 10);
        if (Datee >= this.FromDate && Datee <= this.ToDate) {
          this.FilteredList.push(element);
        }
      });
    }

    this.agGrid.gridOptions.api.setRowData(this.FilteredList);

  }

  /*Filter() {
    this.FilteredList = [];

    this.showSecondGrid = false;

    if (this.FromDate == null && this.CustomerID == 0 && this.SalesID == 0) {
      this.FilteredList = this.AllTotalVisits;
    }
    if (this.FromDate != null) {
      this.CustomerVisitsServ.GetVisitsByTime(this.FromDate, this.ToDate).subscribe(res => {
        res.forEach(element => {
          this.FilteredList.push(element);
          if (this.SalesID == 0 && this.CustomerID == 0) {
            this.agGrid.gridOptions.api.setRowData(this.FilteredList);
          }
        });
        if (this.SalesID != 0) {
          let copyList: any[] = [];
          copyList = this.FilteredList;
          this.FilteredList = [];
          copyList.forEach(element => {
            if (element.salesRepId == this.SalesID) {
              this.FilteredList.push(element);
            }
          });
          if (this.CustomerID == 0) {
            this.agGrid.gridOptions.api.setRowData(this.FilteredList);
          }
        }

        if (this.CustomerID != 0) {
          if (this.SalesID != 0 || this.FromDate != null) {
            let copyList: any[] = [];
            copyList = this.FilteredList;
            this.FilteredList = [];
            copyList.forEach(element => {
              if (element.customerCode == this.CustomerID) {
                this.FilteredList.push(element);
              }
            });
          }
          this.agGrid.gridOptions.api.setRowData(this.FilteredList);


        }
      });
    }
    else {
      if (this.SalesID != 0) {

        let count: number;
        this.SalesCustomersList.forEach(element => {
          count = 0;
          this.TotalVisits.forEach(CVelement => {
            if (CVelement.customerCode == element.customerCode) {

              if (count == 0) {
                this.obj.customerCode = CVelement.customerCode;
                this.obj.customerName = CVelement.customerName;
                this.obj.salesRepName = CVelement.salesRepName;
                this.obj.salesRepId = CVelement.salesRepId;
                this.obj.customerLatName = CVelement.customerLatName;
                this.obj.salesRepLatName = CVelement.salesRepLatName;
              }
              count = count + CVelement.visitsNo;
            }
          });
          this.obj.visitsNo = count;
          this.FilteredList.push(this.obj);
          this.resetObj();
        });

      }

      if (this.CustomerID != 0) {
        if (this.SalesID != 0) {
          let copyList: any[] = [];
          copyList = this.FilteredList;
          this.FilteredList = [];
          copyList.forEach(element => {
            if (element.customerCode == this.CustomerID) {
              this.FilteredList.push(element);
            }
          });
        }
        else {

          let count: number = 0;
          this.TotalVisits.forEach(CVelement => {
            if (CVelement.customerCode == this.CustomerID) {

              if (count == 0) {
                this.obj.customerCode = CVelement.customerCode;
                this.obj.customerName = CVelement.customerName;
                this.obj.salesRepName = CVelement.salesRepName;
                this.obj.salesRepId = CVelement.salesRepId;
                this.obj.customerLatName = CVelement.customerLatName;
                this.obj.salesRepLatName = CVelement.salesRepLatName;
              }
              count = count + CVelement.visitsNo;
            }
          });
          this.obj.visitsNo = count;
          this.FilteredList.push(this.obj);
          this.resetObj();

        }

      }
    }
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  }*/

}
