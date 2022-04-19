import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from 'src/app/api.service/customer/customer-service';
import { ModuleRegistry } from "@ag-grid-community/core";
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';


import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { CustomerVisitsService } from 'src/app/api.service/codes-service/customer-visits.service';
import { GetAllVisits } from 'src/app/Interfaces/View/get-all-visits';
import { CustimerIDs } from 'src/app/Interfaces/View/custimer-ids';
import { TerritoryService } from 'src/app/api.service/codes-service/territory.service';
import { SectorService } from 'src/app/api.service/codes-service/Sector.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-total-visits-rep',
  templateUrl: './total-visits-rep.component.html',
  styleUrls: ['./total-visits-rep.component.css']
})
export class TotalVisitsRepComponent implements OnInit {

  Tid: any = 0;
  Territory: any;
  Sid: any = 0;
  Sector: any;
  LoginedGroupIDCustomer: any;
  LoginedSalesRepID: any;
  LoginedUserIDCustomer: any;
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
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  
  ExportExcel(List): void {
    if (this.ReportName != "") {
      this.spinner.show();
      /* var params = {
        allColumns:  true,
        columnGroups:true,
        fileName: this.ReportName
    };
    this.agGrid.gridOptions.api.exportDataAsExcel(params);
     this.gridApi.api.ExportExcel(params); */
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

  // ExportDetailsExcel(): void {
  //   if (this.ReportName != "") {
  //     this.spinner.show();
  //     /* var params = {
  //       allColumns:  true,
  //       columnGroups:true,
  //       fileName: this.ReportName
  //   };
  //   this.agGrid.gridOptions.api.exportDataAsExcel(params);
  //    this.gridApi.api.ExportExcel(params); */
  //     this.exportAsExcelFile(this.FilteredList, this.ReportName);
  //     this.ReportName = "";
  //     setTimeout(() => {
  //       this.spinner.hide();
  //     }, 1000);
  //   }
  //   else {

  //     alert("من فضلك ادخل اسم التقرير");
  //   }


  // }
  //#endregion




  ReportName: string = "";
  CustomerID: number = 0;
  SalesID: number = 0;
  FromDate: any;
  ToDate: any;
  AllSales: any;
  AllCustomers: any;

  FilteredList: GetAllVisits[] = [];
  selectedobj: GetAllVisits;
  obj: GetAllVisits;

  AllTotalVisits: any[] = [];
  TotalVisits: any[] = [];
  SalesCustomersList: CustimerIDs[] = [];
  VisitDetails: any[] = [];

  showSecondGrid: boolean = false;

  rowData: any;
  rowData2: any;
  rowSelection = 'single';

  isSubmitted = false;
  private gridApiOption;
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

  X: GetAllVisits

  columnDefs = [
    { headerName: this.Rtl ? 'الزيارات' : 'Visits', field: 'visitsNo', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'العميل ' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المندوب ' : 'Sales Representative', field: 'salesRepName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المحافظه' : 'Governorate', field: 'governorateName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المنطقه' : 'Region', field: 'regionName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاقليم' : 'Territory', field: 'territoryName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'القطاع' : 'Sector', field: 'sectorName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المركز' : 'Address', field: 'adress', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المعرض' : 'Company', field: 'companyName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'التصنيف' : 'Class', field: 'cclName', width: 200, sortable: true, filter: true },
/*     { headerName: this.Rtl ? 'مجالات البيع' : 'Sales Field', field: 'salesFieldName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'اصناف التعاملات' : 'Product Group', field: 'productGroupName', width: 200, sortable: true, filter: true }, */
  ];

  columnDefs2 = [
    { headerName: this.Rtl ? 'العميل ' : 'Customer', field: 'CustomerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المندوب ' : 'Sales Representative', field: 'SalesRepName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'التصنيف' : 'Class', field: 'CCLName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'التاريخ' : 'Date', field: 'Date', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الوقت' : 'Time', field: 'VTime', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'ملخص الزياره' : 'Date', field: 'AnswerName', width: 450, sortable: true, filter: true },
  ];

  constructor(public CustomerVisitsServ: CustomerVisitsService, public obserCustomer: CustomerService, public CustomerServ: CustomerService, public SerSalesRep: SalesRepService,
    private spinner: NgxSpinnerService, private translate: TranslateService,
    private modalService: BsModalService,public TerritoryServ: TerritoryService,public SectorServ: SectorService,) {
      this.LoginedGroupIDCustomer = localStorage.getItem('GroupID');
      this.LoginedUserIDCustomer = localStorage.getItem('id');

      console.log(this.LoginedGroupIDCustomer)

      this.TerritoryServ.GetAlldata().subscribe(res => {
        this.Territory = res;
      });

    var ids = [];

/*     this.CustomerVisitsServ.GetAllVisits().subscribe(res => {

      this.resetX();



      res.forEach(element => {
        this.X.adress = element.adress;
        this.X.cclName = element.cclName;
        this.X.companyName = element.companyName;
        this.X.customerCode = element.customerCode;
        this.X.customerLatName = element.customerLatName;
        this.X.customerName = element.customerName;
        this.X.governorateName = element.governorateName;
        this.X.regionName = element.regionName;
        this.X.salesRepId = element.salesRepId;
        this.X.salesRepLatName = element.salesRepLatName;
        this.X.salesRepName = element.salesRepName;
        this.X.sectorName = element.sectorName;
        this.X.territoryName = element.territoryName;
        this.X.visitsNo = element.visitsNo;


        if (!ids.includes(element.customerCode)) {
          var r = res.filter(x => x.customerCode == element.customerCode);

        
          r.forEach(relement => {

            this.X.productGroupName = this.X.productGroupName + "," + relement.productGroupName;
            this.X.salesFieldName = this.X.salesFieldName + "," + relement.salesFieldName;
          });

     

          this.AllTotalVisits.push(this.X);
          this.resetX();
         
          ids.push(element.customerCode);
        }

      });



      // this.AllTotalVisits = res;
    }); */

    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {

    this.resetObj();

    this.ToDate = new Date().toJSON().slice(0, 10);
 
    if(this.LoginedGroupIDCustomer == 1){
   
      alert('1')
          this.obserCustomer.GetAlldata().subscribe(res => {
            this.AllCustomers = res;
            console.log(res)
          });
        }
        else{
          
          alert('2')
          this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(
            res => {
              this.LoginedSalesRepID = res;
              if (res != 0) {
                 this.obserCustomer.GetCustByLevel().subscribe(x=>{
                  this.AllCustomers  =x
                })
              }
            }
          );
         /*  this.obserCustomer.GetByActualID(this.LoginedUserIDCustomer).subscribe(x=>{
            this.AllCustomers = x;
          }) */
      
        }

    this.SerSalesRep.GetAlldata().subscribe(res => {
      this.AllSales = res;
    });



   

  }

  resetX() {
    this.X = {
      visitsNo: 0,
      customerCode: 0,
      customerName: "",
    customerLatName: "",
      salesRepId: 0,
      salesRepName: "",
    salesRepLatName: "",
     regionName: "",
     sectorName: "",
     territoryName: "",
     governorateName: "",
     cclName: "",
      adress: "",
     companyName: "",
     salesFieldName: "",
     productGroupName: "",
     sectorId:0,
     territoryId:0,
    }
  }

  resetObj() {
    this.obj = {
      customerCode: 0,
      customerName: null,
     customerLatName: null,
      salesRepId: 0,
      salesRepName: null,
      salesRepLatName: null,
      visitsNo: 0,
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApiOption = params.api
    this.FilteredList = [];
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  }

  onGridReady2(params) {

    this.gridApi2 = params.api;

    this.VisitDetails = [];
    this.agGrid2.gridOptions.api.setRowData(this.VisitDetails);

  }
  onChangeSelectionT(selected) {
    this.Tid = parseInt(selected);
    /* if (this.LoginedGroupIDCustomer != 1) {

      this.GovernorateServ.getBySalesS(this.LoginedSalesRepID, this.Sid)
        .subscribe(xc => {
          this.Governorate = xc;

        });
        this.SectorServ.getone(this.Tid).subscribe(res => {
          this.Sector = res;
        });
    } */
    // else {
      /* this.GovernorateServ.GetAlldata().subscribe(res => {
        this.Governorate = res; */
    //  });
      this.SectorServ.getone(this.Tid).subscribe(res => {
        this.Sector = res;
      });
    //}
 }
 onChangeSelectionS(selected) {
  this.Sid = parseInt(selected);

  
  
}

  Filter() {
    this.spinner.show();
    this.FilteredList = [];
    if (this.FromDate != null) {
      this.CustomerVisitsServ.GetVisitsByTime(this.FromDate, this.ToDate).subscribe(res => {
        this.FilteredList=res;
        console.log(this.FilteredList)
        if( this.SalesID>0)
        {
          this.FilteredList= this.FilteredList.filter(x=>x.salesRepId==this.SalesID)
        
        }
        if(    this.Tid >0){
          this.FilteredList= this.FilteredList.filter(x=>x.territoryId==this.Tid)

        }
        if(    this.Sid >0){
          this.FilteredList= this.FilteredList.filter(x=>x.sectorId==this.Sid)

        }
        
     
        this.agGrid.gridOptions.api.setRowData(this.FilteredList);
          this.showSecondGrid = true;
         this.VisitDetails = [];
        this.CustomerVisitsServ.CustomerVisitsView2(this.CustomerID,
          this.SalesID,this.FromDate, this.ToDate).subscribe(
           res=>{
             
             this.VisitDetails = res;
             this.agGrid2.gridOptions.api.setRowData(this.VisitDetails);
         

          
           setTimeout(() => {
             this.spinner.hide();
           }, 1000);
           }
         )
         ;
     

      });
      this.spinner.hide();

    
    }

    else
    {
    this.CustomerVisitsServ.GetAllVisits().subscribe(res => {
      this.FilteredList=res;
      if( this.SalesID>0)
      {
        this.FilteredList= this.FilteredList.filter(x=>x.salesRepId==this.SalesID)
      }
      this.agGrid.gridOptions.api.setRowData(this.FilteredList);
      this.showSecondGrid = true;
      this.VisitDetails = [];
      //this.agGrid2.gridOptions.api.setRowData(this.VisitDetails);
   /*    const selectedRows = this.gridApi.getSelectedRows();
      this.selectedobj = selectedRows[0]; */
   
      this.CustomerVisitsServ.CustomerVisitsView2(this.CustomerID,
        this.SalesID,'2010-01-01', '2090-01-01').subscribe(
        res=>{
          
          this.VisitDetails = res;
       

          if( this.SalesID>0)
             {
               this.VisitDetails= this.VisitDetails.filter(x=>x.SalesRepId==this.SalesID)
             }
        this.agGrid2.gridOptions.api.setRowData(this.VisitDetails);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        }
      )
      ;
   
    }
    );
  }

    this.showSecondGrid = false;

/*     if (this.FromDate == null && this.CustomerID == 0 && this.SalesID == 0) {
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
    this.agGrid.gridOptions.api.setRowData(this.FilteredList); */
  }

  onChangeSelectionByCustomer(selected) {
    this.CustomerID = parseInt(selected);
  }

  onChangeSelectionCustomerBySalesID(selected) {
    this.SalesID = parseInt(selected);

    this.CustomerVisitsServ.GetSalesCustomers(this.SalesID).subscribe(res => { this.SalesCustomersList = res; });
  }

  view() {


   

/*     this.CustomerVisitsServ.CustomerVisitsView2(1,
     2).subscribe(res => {
      this.VisitDetails = res;
      this.agGrid2.gridOptions.api.setRowData(this.VisitDetails);
    });
   */

   

    // this.TotalVisits.forEach(element => {


  /*     if (this.selectedobj.customerCode == element.customerCode && this.selectedobj.salesRepId == element.salesRepId) {
        if (this.FromDate == null) {
          this.VisitDetails.push(element);

        }
        else {
          if (element.date >= this.FromDate && element.date <= this.ToDate) {
            this.VisitDetails.push(element);
          }

        }


      }
    });
    console.log(this.VisitDetails); */
 


  }

  hide() {
    this.modalRef.hide();
  }

}

