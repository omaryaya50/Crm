import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AnswerChoisesServiceService } from 'src/app/api.service/codes-service/answer-choises-service.service';
import { AnswerServiceService } from 'src/app/api.service/codes-service/answer-service.service';
import { VersionServiceService } from 'src/app/api.service/codes-service/version-service.service';
import { VersionQuestionAnswerServiceService } from 'src/app/api.service/codes-service/version-question-answer-service.service';
import { QuestionServiceService } from 'src/app/api.service/codes-service/question-service.service';
import { AnswerTypesServiceService } from 'src/app/api.service/codes-service/answer-types-service.service';
import { ProgSericeService } from 'src/app/api.service/prog-serice.service';
import { CustomerVisitsService } from 'src/app/api.service/codes-service/customer-visits.service';
import { CustomerVisitsChoisesService } from 'src/app/api.service/codes-service/customer-visits-choises.service';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { CustomerService } from 'src/app/api.service/customer/customer-service';
import { saveAs as importedSaveAs } from 'file-saver';
import { CustomerVisitsFilesService } from 'src/app/api.service/codes-service/customer-visits-files.service';
import { AgentService } from 'src/app/api.service/codes-service/agent.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-cust-rep',
  templateUrl: './cust-rep.component.html',
  styleUrls: ['./cust-rep.component.css']
})
export class CustRepComponent implements OnInit {
  LoginedUserIDCustomer: any;
  LoginedGroupIDCustomer: any;
  LoginedSalesRepID: any;


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

  ViewReport: boolean = false;

  QuestionsList: any[] = [];
  CustomerVisits: any[] = [];

  CustomerVisitsList: any[] = [];
  dropdownSettings2: IDropdownSettings = {};


  Agents: any;


  CustomerVisitAnswer: any;
  CustomerVisitAnswerChoisesList: any;
  CustomerVisitsFilesList: any;

  AnswerChoisesList: any;
  AllSales: any;
  AllCustomers: any;
  SalesID: any = 0;
  CustomerID: any = 0;
  FromDate: any;
  ToDate: any;
  custlist: any[] = [];
  noanswer:string ="no answer";


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
    { headerName: this.Rtl ? 'الزياره' : 'Visit No.', field: 'visitNumber', width: 150, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المندوب' : 'Sales Representative', field: 'salesRepName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'العميل' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'التاريخ' : 'Date', field: 'date', width: 200, sortable: true, filter: true },
  ];

  constructor(public AgentServ: AgentService, public CustomerVisitsFilesSer: CustomerVisitsFilesService, public CustomerVisitsChoisesServ: CustomerVisitsChoisesService,
    public CustomerVisitsSerc: CustomerVisitsService, public AnswerChoiseServ: AnswerChoisesServiceService,
    public AnswerServ: AnswerServiceService, public obserCustomer: CustomerService,
    public VersionServ: VersionServiceService, public VQAServ: VersionQuestionAnswerServiceService,
    public QuestionServ: QuestionServiceService, public AnswerTypeServ: AnswerTypesServiceService,
    private spinner: NgxSpinnerService, public SerSalesRep: SalesRepService
    , public ProgServ: ProgSericeService, private translate: TranslateService,
    private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
    this.LoginedUserIDCustomer = localStorage.getItem('id');
    this.LoginedGroupIDCustomer = localStorage.getItem('GroupID');
  }

  ngOnInit(): void {

    this.rowData = 0;
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'customerID',
      textField: 'customerName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      


    };
    this.resetVersion();
    this.SerSalesRep.GetAlldata().subscribe(res => {
      this.AllSales = res;
    });
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

    this.AgentServ.GetAlldata().subscribe(res => {
      this.Agents = res;
    });

    this.ToDate = new Date().toJSON().slice(0, 10);
    this.LoginIDs();

  }
  LoginIDs() {

    console.log(this.LoginedUserIDCustomer,this.LoginedGroupIDCustomer)
    



  }
 

  onGridReady(params) {
    this.gridApi = params.api;

    this.agGrid.gridOptions.api.setRowData(this.CustomerVisitsList);

  }
  cancel() {


    this.ViewReport = false;

    this.CustomerVisits = [];
    this.CustomerVisitsFilesList = [];
    this.QuestionsList = [];
    this.CustomerVisitAnswerChoisesList = [];
    this.AnswerChoisesList = [];
  }

  ViewQuestionAnswer() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {

      this.CustomerVisitsSerc.IVCustomerVisits = selectedRows[0];
      this.ViewReport = true;

      let Vn = this.CustomerVisitsSerc.IVCustomerVisits.visitNumber;
      let CID = this.CustomerVisitsSerc.IVCustomerVisits.customerCode;
      let salesid = this.CustomerVisitsSerc.IVCustomerVisits.salesRepCode;

      this.CustomerVisitsSerc.getCustomerVisit(CID, Vn, salesid).subscribe(res => {
        this.CustomerVisits = res;

        this.VersionServ.Getone(this.CustomerVisits[0].versionCode).subscribe(Vres => {
          this.VersionServ.Version = Vres;
          this.CustomerVisitsFilesSer.getCustomerVisit(CID, Vn, this.VersionServ.Version.versionCode)
            .subscribe(res => {
              this.CustomerVisitsFilesList = res;
            });
        });
        this.CustomerVisitsSerc.GetCustomerVisitQuestions(CID, Vn, salesid).subscribe(Qres => {
          this.QuestionsList = Qres;
          this.QuestionsList.forEach(element => {
            this.CustomerVisitsChoisesServ.FindByQuestion(element.questionCode, CID, Vn).subscribe(Cres => {
              this.CustomerVisitAnswerChoisesList = Cres;
              this.AnswerServ.GetByQuestion(element.questionCode).subscribe(res => {
                this.AnswerChoiseServ.GetByAnswer(res.answersCode).subscribe(res => { this.AnswerChoisesList = res; });
              });
            });
          });
        });
      });


    }
    else {
      alert('Must select Record');
    }
  }

  resetVersion() {
    this.VersionServ.Version =
    {
      versionCode: 0,
      versionActulCode: 0,
      versionName: null,
      versionLatName: null,
      defult: false,
      asked: false
    };
  }

  onChangeSelectionCustomerBySalesID(selected) {
    this.SalesID = parseInt(selected);
  }
  onChangeSelectionByCustomer(selected) {
    this.CustomerID = parseInt(selected);
  }

  Filter() {

    let DateList: any[] = [];

    this.CustomerVisitsList = [];
    this.CustomerVisitsSerc.GetTheView().subscribe(res => {

      res.forEach(element => {
       
          DateList.push(element);
        
      });

      let SalesList: any[] = [];
      let CustomerList: any[] = [];
   /*   if (this.CustomerID != 0) {
        this.CustomerVisitsList = [];

        if (SalesList.length != 0) {
          SalesList.forEach(element => {
            if (element.customerCode == this.CustomerID) {
              console.log(this.CustomerID)
              
              CustomerList.push(element);
            }

          });
        }
        else {
          DateList.forEach(element => {
            if (element.customerCode == this.CustomerID) {
              CustomerList.push(element);
            }
          });
        }
        this.CustomerVisitsList = CustomerList;
      }
*/

if (this.custlist.length != 0) {
    this.custlist.forEach(Lelement => {
      console.log("aaaaaaaaaaaa")


    DateList.forEach(element => {
      console.log("aaaaaaaaaaaa")

      if (element.customerName == Lelement.customerName) {
        console.log("aaaaaaaaaaaa")

        CustomerList.push(element);
        this.CustomerVisitsList = CustomerList;
      }
      


    });
  });

}
if (this.SalesID != 0) {
  this.CustomerVisitsList = [];
  
  DateList.forEach(element => {
    if (element.salesRepCode == this.SalesID) {
      console.log(this.SalesID);
      SalesList.push(element);
    }
  });
  this.CustomerVisitsList = SalesList;
}
if (this.SalesID == 0 && this.custlist.length == 0 ) {
        this.CustomerVisitsList = DateList;
      } 
this.agGrid.gridOptions.api.setRowData(this.CustomerVisitsList);
    });


  }

  DownloadFile(filepath) {
    const DocFileName = filepath;
    if (DocFileName != null && DocFileName.toString() != '') {
      this.CustomerVisitsFilesSer.downloadFile(DocFileName).subscribe(
        (data: Blob) => {
          importedSaveAs(data, DocFileName); // from file-saver library
        },
        (err: any) => {
          console.log(`Unable to save file ${JSON.stringify(err)}`)
        }
      );
    }
  }

}
