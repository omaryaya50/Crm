import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CustomerCompetitionService } from 'src/app/api.service/customer/CustomersCompetition-service';
import { CompetitionCompanyService } from 'src/app/api.service/codes-service/CompetitionCompany.service';
import { AllColumnsCustomerCompitions } from 'src/app/Interfaces/View/all-columns-customer-compitions';
import { CustomerProductGroupService } from 'src/app/api.service/customer/CustomersProductGroup-service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-comption',
  templateUrl: './comption.component.html',
  styleUrls: ['./comption.component.css']
})
export class ComptionComponent implements OnInit {

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


  ReportName: string = "";

  CustClass: any;
  CustID: any = 0;
  CustomerClassViewList: AllColumnsCustomerCompitions[] = [];

  CustomerClassViewElement: AllColumnsCustomerCompitions;


  FilteredList: any[] = [];

  withoutList: any;



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
 /*    { headerName: this.Rtl ? 'العميل' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المركز' : 'Address', field: 'adress', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'القطاع' : 'Sector', field: 'sectorName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المنطقه' : 'Region', field: 'regionName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المحافظه' : 'Governorate', field: 'governorateName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'اقليم' : 'Territory', field: 'territoryName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المعرض' : 'Company', field: 'company', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المنافس' : 'Competition Company', field: 'competitionCompanyName', width: 500, sortable: true, filter: true },
    { headerName: this.Rtl ? 'اجمالي اصناف التعاملات' : 'Total Product Groups', field: 'total', width: 200, sortable: true, filter: true },
   */
  ];

  constructor(public CustomerProductGroupServ: CustomerProductGroupService, public CustomerCompetitionServ: CustomerCompetitionService, public CompetitionCompanyServ: CompetitionCompanyService,
    private spinner: NgxSpinnerService, private translate: TranslateService,
    private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
    
  }


  ngOnInit(): void {

    this.CompetitionCompanyServ.GetAlldata().subscribe(res => {
      this.CustClass = res;
    });
    this.reset();
  }

  reset() {
    this.CustomerClassViewElement = {
      competitionCompanyId: 0,
      competitionCompanyName: "",
      customerID: 0,
      customerName: '',
      territoryName: "",
      sectorName: "",
      governorateName: "",
      regionName: "",
      company: "",
      adress: "",
      territoryID: 0,
      sectorID: 0,
      governorateID: 0,
      regionID: 0,
      total: 0,
    }
  }

  onGridReady(params) {

    this.gridApi = params.api;
    this.CustomerClassViewList = [];
    
 /*    this.CustomerCompetitionServ.CustomercompitionCompanyView().subscribe(res => {

      
      this.CustomerProductGroupServ.TotalCustomerProductsViews().subscribe(res1 => {
        
        res.forEach(element => {
          this.CustomerClassViewElement.competitionCompanyId = element.competitionCompanyId;
          this.CustomerClassViewElement.competitionCompanyName = element.competitionCompanyName;
          this.CustomerClassViewElement.customerID = element.customerID;
          this.CustomerClassViewElement.customerName = element.customerName;
          this.CustomerClassViewElement.territoryName = element.territoryName;
          this.CustomerClassViewElement.sectorName = element.sectorName;
          this.CustomerClassViewElement.governorateName = element.governorateName;
          this.CustomerClassViewElement.regionName = element.regionName;
          this.CustomerClassViewElement.company = element.company;
          this.CustomerClassViewElement.adress = element.adress;
          this.CustomerClassViewElement.territoryID = element.territoryID;
          this.CustomerClassViewElement.sectorID = element.sectorID;
          this.CustomerClassViewElement.governorateID = element.governorateID;
          this.CustomerClassViewElement.regionID = element.regionID;

          this.CustomerClassViewElement.total = 0;


          res1.forEach(element1 => {
            
          
            if (element.customerID == element1.customerId) {
              
              
              this.CustomerClassViewElement.total = element1.total;
              
            }
          });
          this.CustomerClassViewList.push(this.CustomerClassViewElement);
          this.reset();

        });
      });
    }); */
    this.FilteredList = [];
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);

  }

  Filter() {

    this.FilteredList = [];
    this.spinner.show();
    this.CustomerCompetitionServ.CustomercompitionCompanyView(this.CustID).subscribe(res => {
      this.FilteredList=res;
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
      this.agGrid.gridOptions.api.setRowData(this.FilteredList);
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    },err=>
    {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    );
   /*  if (this.CustID != 0) {
      this.CustomerClassViewList.forEach(element => {
        if (element.competitionCompanyId == this.CustID) {
          this.FilteredList.push(element);
        }

      });

    }
    else {
      this.FilteredList = this.CustomerClassViewList;
    }


    
  let id = [];
  this.FilteredList.forEach(element => {

    if (!id.includes(element.customerID)) {
      id.push(element.customerID);
    }

  });
  
  let Copy = this.FilteredList;
  this.FilteredList = [];
  var i = -1;

  id.forEach((idelement, index) => {
    var x = {
      customerID:0,
      customerName: '',
      customerClassName: '',
      adress: '',
      sectorName: '',
      regionName: '',
      governorateName: '',
      territoryName: '',
      company: '',
      competitionCompanyName:'',
      total:0,
      territoryID:0,
      sectorID:0,
      governorateID:0,
      regionID:0,
    };
    Copy.forEach(Listelement => {
      if (idelement == Listelement.customerID) {
        if (i != index) {
          
          x.customerID=Listelement.customerID;
          x.customerName = Listelement.customerName;
          x.customerClassName = Listelement.customerClassName;
          x.adress = Listelement.adress;
          x.sectorID=Listelement.sectorID;
          x.sectorName = Listelement.sectorName;
          x.regionID=Listelement.regionID;
          x.regionName = Listelement.regionName;
          x.governorateID=Listelement.governorateID;
          x.governorateName = Listelement.governorateName;
          x.territoryID=Listelement.territoryID;
          x.territoryName = Listelement.territoryName;
          x.company = Listelement.company;
          x.total = Listelement.total;
          
          i = i + 1;
        }

        x.competitionCompanyName=x.competitionCompanyName+","+ Listelement.competitionCompanyName;

      }
    });
    this.FilteredList.push(x);
  }); */
  




    

  }
  without() {
    this.spinner.show();
    this.CustomerCompetitionServ.NotCustomercompitionCompanyView().subscribe(res => {
     
      this.FilteredList = [];
      this.FilteredList = res;
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
      this.agGrid.gridOptions.api.setRowData(res);
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });


  }

  onChangeSelectionCustomerClass(selected) {
    this.CustID = parseInt(selected);

  }

}

