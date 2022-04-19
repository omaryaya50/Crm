import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustClassService } from '../api.service/codes-service/CustClass.service';
import { GovernorateService } from '../api.service/codes-service/governorate-service.service';
import { RegionService } from '../api.service/codes-service/region-service.service';
import { SalesRepService } from '../api.service/codes-service/sales-rep.service';
import { SectorService } from '../api.service/codes-service/Sector.service';
import { TerritoryService } from '../api.service/codes-service/territory.service';
import { CustomerService } from '../api.service/customer/customer-service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';



@Component({
  selector: 'app-filter-cust',
  templateUrl: './filter-cust.component.html',
  styleUrls: ['./filter-cust.component.css']
})
export class FilterCustComponent implements OnInit {
  CustomerView: any;
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
    this.spinner.show();
    this.obserCustomer.custfilter().subscribe(res => {
      this.CustomerView = res;
      this.exportAsExcelFile(this.CustomerView, 'Customerfilter');
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    })
  }
  CustomerID: any = 0;
  AllCustomers: any;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  SalesID: any = 0;
  AllSales: any;
  Tid: any = 0;
  Territory: any;
  Sid: any = 0;
  Sector: any;
  //ff
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


  Governorate: any;
  Region: any;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  private gridApidisplay;
  rowData: any;
  columnDefs: any;
  rowSelection = 'single';
  constructor(public obserCustomer: CustomerService,public RegionServ: RegionService, 
    public SerSalesRep: SalesRepService,public GovernorateServ: GovernorateService,
     public TerritoryServ: TerritoryService,public SectorServ: SectorService,
      public CustClassServ: CustClassService, private spinner: NgxSpinnerService) {
    this.LoginedGroupIDCustomer = sessionStorage.getItem('GroupID');
    this.LoginedUserIDCustomer = sessionStorage.getItem('ID');
 
    
   

      this.obserCustomer.GetAlldata().subscribe(res => {
        this.AllCustomers = res;
      });
      this.SerSalesRep.GetAlldata().subscribe(res => {
        this.AllSales = res;
      });
      this.TerritoryServ.GetAlldata().subscribe(res => {
        this.Territory = res;
      });

      this.CustClassServ.GetAlldata().subscribe(res => {
        this.CustClass = res;
      });
    

    this.Setgrid();
    this.obserCustomer.objfiltercust={
      CustomerID:0,
      Gid:0,
      Rid:0, 
      SalesID:0,
      Sid:0,
      Tid:0 
    }
    }
  async  Filter() {
  
  
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
  
      this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  
    }
    onChangeSelectionCustomerClass(selected) {
      this.CustID = parseInt(selected);
  
    }
  
    onChangeSelectionByCustomer(selected) {
      this.CustomerID = parseInt(selected);
    }
    onChangeSelectionCustomerBySalesID(selected) {
      this.SalesID = parseInt(selected);
    }
    onChangeSelectionT(selected) {
      this.Tid = parseInt(selected);
      if (this.LoginedGroupIDCustomer != 1) {
  
        this.GovernorateServ.getBySalesS(this.LoginedSalesRepID, this.Sid)
          .subscribe(xc => {
            this.Governorate = xc;
  
          });
          this.SectorServ.getone(this.Tid).subscribe(res => {
            this.Sector = res;
          });
      }
      else {
        this.GovernorateServ.GetAlldata().subscribe(res => {
          this.Governorate = res;
        });
        this.SectorServ.getone(this.Tid).subscribe(res => {
          this.Sector = res;
        });
      }
   }

  ngOnInit(): void {
  
    

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
  onChangeSelectionR(selected) {
    this.Rid = parseInt(selected);

  }
  onSelectionChanged(params) {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.obserCustomer.obIcustomer = selectedRows[0];
    }




}
onGridReady(params) {
  this.gridApidisplay = params.api;
  this.rowData = this.obserCustomer.getone(0);

}

async showdata(){
  this.spinner.show();
this.obserCustomer.objfiltercust.CustomerID=this.CustomerID;
this.obserCustomer.objfiltercust.SalesID=this.SalesID;
this.obserCustomer.objfiltercust.Tid=this.Tid;
this.obserCustomer.objfiltercust.Gid=this.Gid;
this.obserCustomer.objfiltercust.Rid=this.Rid;
this.obserCustomer.objfiltercust.Sid=this.Sid;
  this.rowData=await this.obserCustomer.custfilter();
  
  setTimeout(() => {
    this.spinner.hide();
  }, 4000);

}
Setgrid() {
  this.columnDefs = [
    {
      headerName: this.Rtl ? 'كود العميل' : 'Customer Id', field: 'customerId', width: 150,
      sortable: true, filter: true
    },
    // tslint:disable-next-line: max-line-length
    {
      headerName: this.Rtl ? 'الوصف العربى' : 'Customer Name', field: 'customerName',
      width: 300, sortable: true, filter: true
    },
    // tslint:disable-next-line: max-line-length
    {
      headerName: this.Rtl ? ' اسم المنشأه عربي' : 'Company Name', field: 'companyName',
      width: 300, sortable: true, filter: true
    },
    {
      headerName: this.Rtl ? ' المندوب' : 'Sales Representative', field: 'salesRepName',
      width: 300, sortable: true, filter: true
    },
    {
      headerName: this.Rtl ? 'القطاع'  : 'Territory', field: 'territoryName',
      width: 300, sortable: true, filter: true
    },
    {
      headerName: this.Rtl ? 'الاقليم'  : 'Sector', field: 'sectorName',
      width: 300, sortable: true, filter: true
    },
    {
      headerName: this.Rtl ? 'المحافظه'  : 'Governorate', field: 'governorateName',
      width: 300, sortable: true, filter: true
    },
    {
      headerName: this.Rtl ? 'المنطقه'  : 'Region', field: 'regionName',
      width: 300, sortable: true, filter: true
    },
  ];





}
}
