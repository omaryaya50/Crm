import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerVisitsService } from '../api.service/codes-service/customer-visits.service';
import { SalesRepService } from '../api.service/codes-service/sales-rep.service';
import { CustomerService } from '../api.service/customer/customer-service';
import { BtnCellRendererComponent } from '../btn-cell-renderer/btn-cell-renderer.component';

@Component({
  selector: 'app-visit-delete',
  templateUrl: './visit-delete.component.html',
  styleUrls: ['./visit-delete.component.css']
})
export class VisitDeleteComponent implements OnInit {
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  SalesID: any = 0;
  CustomerVisitsList: any[] = [];
  private gridApi;
  AllSales: any;
  AllCustomers: any;
  custlist: any[] = [];
  ReportName: string = "";

  ViewReport: boolean = false;

  QuestionsList: any[] = [];
  CustomerVisits: any[] = [];

  dropdownSettings2: IDropdownSettings = {};


  Agents: any;


  CustomerVisitAnswer: any;
  CustomerVisitAnswerChoisesList: any;
  CustomerVisitsFilesList: any;

  AnswerChoisesList: any;
  
  CustomerID: any = 0;
  FromDate: any;
  ToDate: any;
  noanswer:string ="no answer";


  rowData: any;
  rowSelection = 'single';

  isSubmitted = false;
  public defaultColDef;
  public api: GridApi;
  title: string;
  modalRef: BsModalRef;
  frameworkComponents: { btnCellRenderer: typeof BtnCellRendererComponent; };



  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { headerName: this.Rtl ? 'الزياره' : 'Visit No.', field: 'visitsNo', width: 150, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المندوب' : 'Sales Representative', field: 'salesRepName', width: 150, sortable: true, filter: true },
    { headerName: this.Rtl ? 'العميل' : 'Customer', field: 'customerName', width: 150, sortable: true, filter: true },
     {headerName: this.Rtl ? 'تاريخ الزياره' : 'Date', field: 'date', width: 150, sortable: true, filter: true },
     {headerName: this.Rtl ? 'ver' : 'ver', field: 'versionCode', width: 150, sortable: true, filter: true },
    {
      headerName: this.Rtl ? 'مسح الزياره' : 'DeleteVisit',
      field: 'DeleteVisit', 
      cellRenderer: "btnCellRenderer",
      cellRendererParams: {
        clicked: function(field: any) {
          alert(`${field} was deleted`)
        }
      },
      minWidth: 150
    },
  ];
 

  FilteredList: any[];
 
  constructor(public SerSalesRep: SalesRepService, public obserCustomer: CustomerService, public CustomerVisitsSerc: CustomerVisitsService,private spinner: NgxSpinnerService) {
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRendererComponent
    };
    this.defaultColDef = { resizable: true };
   }

  ngOnInit(): void {
    this.SerSalesRep.GetAlldata().subscribe(res => {
      this.AllSales = res;
    });
    this.ToDate = new Date().toJSON().slice(0, 10);


    this.obserCustomer.GetAlldata().subscribe(res => {
      this.AllCustomers = res;
    });
  }
  onChangeSelectionCustomerBySalesID(selected) {
    this.SalesID = parseInt(selected);
  }
  onChangeSelectionByCustomer(selected) {
    this.CustomerID = parseInt(selected);
  }
  Filter() {

    this.spinner.show();
    this.FilteredList = [];

      this.CustomerVisitsSerc.GetVisitsByTime2 (this.FromDate!=null? this.FromDate:"", 
        this.FromDate!=null? this.ToDate:"" ).subscribe(res => {
        this.FilteredList=res;
      
        if( this.SalesID>0)
        {
          this.FilteredList= this.FilteredList.filter(x=>x.salesRepId==this.SalesID)
        
        }
        if(this.CustomerID>0){
          this.FilteredList= this.FilteredList.filter(x=>x.customerCode==this.CustomerID)
        }
        this.agGrid.gridOptions.api.setRowData(this.FilteredList);
        setTimeout(() => {
         
          this.spinner.hide();
        }, 1000);
        });
        
        
         
        
          
        
     

     

    
    
/*     else
    {
    this.CustomerVisitsSerc.GetAllVisits().subscribe(res => {
      this.FilteredList=res;
      if( this.SalesID>0)
      {
        this.FilteredList= this.FilteredList.filter(x=>x.salesRepId==this.SalesID)
      }
      if(this.CustomerID>0){
        this.FilteredList= this.FilteredList.filter(x=>x.customerCode==this.CustomerID)
      }
      this.agGrid.gridOptions.api.setRowData(this.FilteredList);
   
   
 
   
    });
  } */

    


  }
  onGridReady(params) {
    this.gridApi = params.api;

    this.agGrid.gridOptions.api.setRowData(this.FilteredList);

  }
}
