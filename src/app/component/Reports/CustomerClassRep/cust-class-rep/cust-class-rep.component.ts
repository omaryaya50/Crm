import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from 'src/app/api.service/customer/customer-service';
import { CustClassService } from 'src/app/api.service/codes-service/CustClass.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { GovernorateService } from 'src/app/api.service/codes-service/governorate-service.service';
import { RegionService } from 'src/app/api.service/codes-service/region-service.service';
import { SectorService } from 'src/app/api.service/codes-service/Sector.service';
import { TerritoryService } from 'src/app/api.service/codes-service/territory.service';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-cust-class-rep',
  templateUrl: './cust-class-rep.component.html',
  styleUrls: ['./cust-class-rep.component.css']
})


export class CustClassRepComponent implements OnInit {
  public  ReportName:'';
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
      this.spinner.show(this.ReportName);
      this.exportAsExcelFile(List, this.ReportName);
     
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    else {
      alert("من فضلك ادخل اسم التقرير");
    }


  }
  //#endregion


  

  CustClass: any;
  CustID: any = 0;
  CustomerClassViewList: any;
  CustomerClassViewListCopy: any;

  LoginedUserIDCustomer: any;
  LoginedGroupIDCustomer: any;
  LoginedSalesRepID: number;

  FilteredList: any[] = [];
  Total: any;

  Gid: any = 0;
  Rid: any = 0;
  Sid: any = 0;
  Tid: any = 0;

  Governorate: any;
  Region: any;
  Territory: any;
  Sector: any;


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
    { headerName: this.Rtl ? 'العميل' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'القطاع' : 'Territory', field: 'territory', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'اقليم' : 'Sector', field: 'sector', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المحافظه' : 'Governorate', field: 'governorate', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المركز' : 'Address', field: 'region', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? ' التصنيف' : 'Customer Class', field: 'customerClassName', width: 200, sortable: true, filter: true },
  ];

  columnDefs2 = [
    { headerName: this.Rtl ? 'التصنيف' : 'Classification', field: 'classificationName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاجمالي' : 'Total', field: 'total', width: 200, sortable: true, filter: true },
  ];


  constructor(public RegionServ: RegionService, public SectorServ: SectorService, public TerritoryServ: TerritoryService,
    public GovernorateServ: GovernorateService, public CustomerServ: CustomerService, public CustClassServ: CustClassService,
    private spinner: NgxSpinnerService, private translate: TranslateService, public SerSalesRep: SalesRepService,
    private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
    this.LoginedGroupIDCustomer = sessionStorage.getItem('GroupID');
    this.LoginedUserIDCustomer = sessionStorage.getItem('ID');

    if (this.LoginedGroupIDCustomer == 1) {
      this.TerritoryServ.GetAlldata().subscribe(res => {
        this.Territory = res;
      });

      this.CustClassServ.GetAlldata().subscribe(res => {
        this.CustClass = res;
      });
    }
    else {


      this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
        this.LoginedSalesRepID = res;

        this.TerritoryServ.getBySales(this.LoginedSalesRepID).subscribe(orders => {
          this.Territory = orders;
        });

      });
    }
    if (this.LoginedGroupIDCustomer != 1) {
      this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
        this.LoginedSalesRepID = res;
        this.CustomerServ.SalesManagerCustomerClassView(this.LoginedSalesRepID).subscribe(res => {
          this.CustomerClassViewList = res;
        });
      });
    }
    else {

      this.CustomerServ.CustomerClassView().subscribe(res => {
        this.CustomerClassViewList = res;
      });
    }
  }


  ngOnInit(): void {

  
  }

  onGridReady(params) {
    this.gridApi = params.api;


  




    this.FilteredList = [];
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);

  }

  onGridReady2(params) {

    this.gridApi2 = params.api;
    this.Total = [];
    this.agGrid2.gridOptions.api.setRowData(this.Total);
    this.CustomerServ.totalClassification().subscribe(res => {
      this.Total = res;
    
      this.agGrid2.gridOptions.api.setRowData(this.Total);
    });




  }

  async Filter() {
try
{
    this.spinner.show();
    this.FilteredList = [];
    if (this.CustID != 0) {
      this.CustomerClassViewList.forEach(element => {
        if (element.customerClassID == this.CustID) {
          this.FilteredList.push(element);
        }

      });
    }
    if (this.Gid != 0) {
      if (this.CustID != 0) {
        let CopyList = this.FilteredList;
        this.FilteredList = []
        CopyList.forEach(element => {
          if (element.governorateID == this.Gid) {
            this.FilteredList.push(element);
          }

        });

      }
      else {
        this.CustomerClassViewList.forEach(element => {
          if (element.governorateID == this.Gid) {
            this.FilteredList.push(element);

          }

        });
      }
      if (this.Rid != 0) {
        let copyList = this.FilteredList;
        this.FilteredList = [];
        copyList.forEach(element => {
          if (element.regionID == this.Rid) {
            this.FilteredList.push(element);
          }
        });
      }
    }

    if (this.Tid != 0) {
      if (this.CustID != 0 || this.Gid != 0) {
        let CopyList = this.FilteredList;
        this.FilteredList = []
        CopyList.forEach(element => {
          if (element.territoryID == this.Tid) {
            this.FilteredList.push(element);
          }

        });

      }
      else {
        this.CustomerClassViewList.forEach(element => {
          if (element.territoryID == this.Tid) {
            this.FilteredList.push(element);
          }

        });
      }
      if (this.Sid != 0) {
        let copyList = this.FilteredList;
        this.FilteredList = [];
        copyList.forEach(element => {
          if (element.sectorID == this.Sid) {
            this.FilteredList.push(element);
          }

        });
      }
    }

    if (this.CustID == 0 && this.Tid == 0 && this.Sid == 0 && this.Rid == 0 && this.Gid == 0) {
      this.FilteredList = this.CustomerClassViewList;
    }
await this .Fillgrid()
    
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  catch{
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  }
  async Fillgrid()
  {
    await this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  }

  onChangeSelectionCustomerClass(selected) {
    this.CustID = parseInt(selected);

  }


  onChangeSelectionR(selected) {
    this.Rid = parseInt(selected);

  }

  onChangeSelectionG(selected) {
    this.Gid = parseInt(selected);


    if (this.LoginedGroupIDCustomer != 1) {
      this.RegionServ.getBySalesG(this.LoginedSalesRepID, this.Gid)
        .subscribe(xc => { this.Region = xc; });
    }
    else {
      this.RegionServ.getone(this.Gid).subscribe(res => {
        this.Region = res;
      });
    }
  }

  onChangeSelectionT(selected) {
    this.Tid = parseInt(selected);
    if (this.LoginedGroupIDCustomer == 1) {
      this.SectorServ.getone(this.Tid).subscribe(res => {
        this.Sector = res;
      });
    }
    else {
      this.SectorServ.getBySalesT(this.LoginedSalesRepID, this.Tid).subscribe(res => {
        this.Sector = res;
      });
    }


  }

  onChangeSelectionS(selected) {
    this.Sid = parseInt(selected);
    if (this.LoginedGroupIDCustomer != 1) {
      this.GovernorateServ.getBySalesS(this.LoginedSalesRepID, this.Sid)
        .subscribe(xc => {
          this.Governorate = xc;

        });
    }
    else {
      this.GovernorateServ.GetAlldata().subscribe(res => {
        this.Governorate = res;
      });
    }
  }

}

