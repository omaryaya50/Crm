import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/api.service/customer/customer-service';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { CustClassService } from 'src/app/api.service/codes-service/CustClass.service';
import { TerritoryService } from 'src/app/api.service/codes-service/territory.service';
import { SectorService } from 'src/app/api.service/codes-service/Sector.service';
import { GovernorateService } from 'src/app/api.service/codes-service/governorate-service.service';
import { RegionService } from 'src/app/api.service/codes-service/region-service.service';
import { CustomerSalesFieldService } from 'src/app/api.service/customer/CustomersalesField-service';
import { SalesFieldService } from 'src/app/api.service/codes-service/SalesField.service';
import { CustomerProductGroupService } from 'src/app/api.service/customer/CustomersProductGroup-service';
import { ProductGroupService } from 'src/app/api.service/codes-service/ProductGroup.service';
import { CompetitionCompanyService } from 'src/app/api.service/codes-service/CompetitionCompany.service';
import { CustomerCompetitionService } from 'src/app/api.service/customer/CustomersCompetition-service';
import { CustomerNoteTypesService } from 'src/app/api.service/customer/CustomerNoteTypes-service';
import { NoteTypeService } from 'src/app/api.service/codes-service/NoteType.service';
import { Iselect } from 'src/app/Interfaces/Iselect';
import { CustomerProductGroupPerYearService } from 'src/app/api.service/customer/CustomerProductGroupPerYear-service';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import * as moment from 'moment';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { SalesSectorService } from 'src/app/api.service/codes-service/sales-sector.service';
import { SalesRegionService } from 'src/app/api.service/codes-service/sales-region.service';
import { SalesGovernorateService } from 'src/app/api.service/codes-service/SalesGovernorateService';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';
import { ActivatedRoute } from '@angular/router';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';
import { DatePipe, formatDate } from '@angular/common';




const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  //#region  Excel
  CustomerView: any;
  enableCharts: boolean;

  enableRangeSelection: boolean;
  Date: string;
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
    this.obserCustomer.GetView().subscribe(res => {
      this.CustomerView = res;
      this.exportAsExcelFile(this.CustomerView, 'CustomerData');
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    })
  }
  //#endregion


  latitude: number;
  longitude: number;
  Gchoosen: boolean = false;
  GchoosenNum: any;
  Rchoosen: boolean = false;
  RchoosenNum: any;
  Tchoosen: boolean = false;
  TchoosenNum: any;
  Schoosen: boolean = false;
  SchoosenNum: any;
  restriction: {
    latLngBounds: {
      north: 85.0,
      south: -85.0,
      west: -180.0,
      east: 180.0
    },
    strictBounds: true
  }
  LoginedUserIDCustomer: any;
  LoginedGroupIDCustomer: any;
  LoginedSalesRepID: number;
  Admin: boolean = false;
  MaxIDCopy: any;
  MaxID: number;

  Status: number;
  OriginalID: number;

  AllSales: any;


  ItemsSalesField = [];
  dropdownSettings: IDropdownSettings = {};
  ItemsProductGroup = [];
  ProductGroupSettings: IDropdownSettings = {};
  ItemsCompetitionCompanies = [];
  CompetitionCompaniesSettings: IDropdownSettings = {};
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  modalRef: BsModalRef;
  modalRefCustomerProductGroupPerYear: BsModalRef;
  isSubmitted = false;
  isSubmittedCustomerProductGroupPerYear = false;
  rowData: any;
  rowDatainsert: any;
  private gridApidisplay;
  private gridApiOption;
  columnDefsinsert: any;
  enterymode = 0;
  rowSelection = 'single';
  rowSelectionCustomerProductGroupPerYear = 'single';
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGridinsert') agGridinsert: AgGridAngular;
  @ViewChild('agGridinsertCustomerProductGroupPerYear') agGridinsertCustomerProductGroupPerYear: AgGridAngular;
  columnDefs: any;
  Territorys: any;
  noteTypes: any;
  noteTypesselect: Iselect[] = [];
  ItemsProductGroupselect = [];
  sectors: any;
  governorates: any;
  regions: any;
  salesRep: any[] = [];
  custClass: any;
  title: string;
  gridColumnApi: any;
  showCustomerData = true;
  showCustomerAdress = true;
  showMsg = false;
  update = 0;
  updateCustomerProductGroupPerYear = 0;
  gridApiOptionCustomerProductGroupPerYear: any;
  gridColumnApiCustomerProductGroupPerYear: any;
  rowDatainsertCustomerProductGroupPerYear: any;
  columnDefsinsertCustomerProductGroupPerYear: any;
  public _IPrgPer:IPrgPer;


  constructor(public SalesRegionServ: SalesRegionService, public SalesSectorServ: SalesSectorService,
    public obserCustomer: CustomerService, private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService
    , public obsercustClassService: CustClassService, public obserTerritory: TerritoryService
    , public obserSectorService: SectorService
    , public obsergovernorateService: GovernorateService
    , public obserregionService: RegionService
    , public obserCustomerSalesFieldService: CustomerSalesFieldService
    , public obSalesFieldService: SalesFieldService
    , public obserCustomerProductGroupservice: CustomerProductGroupService
    , public obProductGroupService: ProductGroupService
    , public obserCustomerCompetitionCompaniespservice: CustomerCompetitionService
    , public obCompetitionCompaniesService: CompetitionCompanyService
    , public obserCustomerNoteTypesService: CustomerNoteTypesService
    , public obserCustomerProductGroupPerYearService: CustomerProductGroupPerYearService
    , public onnoteTypes: NoteTypeService, public SerSalesRep: SalesRepService,
    public SalesGovernorateServ: SalesGovernorateService,
    private route: ActivatedRoute, public _GroupPermissionService:GroupPermissionService,

  ) {

    this.enableCharts = true;
    this.enableRangeSelection = true;

    this._IPrgPer=
    {
      delete:false,
      edit:false,
      excel:false,
      insert:true,
      print:false,
      progId:0,
      read:false,
      recordList:false,
      sysId:0,
      userId:0
    }
    this.route.data.subscribe(data => {
      this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
       {
         this._IPrgPer=x;
       })

     });
    this.Setgrid();
    this.rowData = this.obserCustomer.GetAlldata();

    this.LoginIDs();

    this.obsercustClassService.GetAlldata().subscribe(orders => {
      this.custClass = orders;
    });
    this.SerSalesRep.GetAlldata().subscribe(
      or => {
        this.AllSales = or;
        this.salesRep = or;
      }
    );

  }

  ngOnInit(): void {
    this.resetCustomer();
     this.Date = formatDate(this.obserCustomer.obIcustomer.CreateDateAndTime, 'yyyy-MM-dd', 'en-US');

  }

  onChangeSelectionCustomerBySalesID(selected) {

    this.rowData = this.obserCustomer.getCustomersBySalesRep(selected);
  }


  LoginIDs() {
    this.LoginedUserIDCustomer = sessionStorage.getItem('ID');
    this.LoginedGroupIDCustomer = sessionStorage.getItem('GroupID');
    console.log(this.LoginedUserIDCustomer,this.LoginedGroupIDCustomer)
  /*   this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
      this.LoginedSalesRepID = res;
      console.log(this.LoginedSalesRepID)


      this.Configselect();
    }); */

  }
  IsAdmin() {
    if (this.LoginedGroupIDCustomer == 1) {
      this.Admin = true;
      this.Status = 1;
      this.OriginalID = 0;
    }

    else if (this.LoginedGroupIDCustomer == 2) {
      //this.Admin = true;
alert('okk')
      this.Status = 1;
      this.OriginalID = 0;


        this.SerSalesRep.getone(this.LoginedSalesRepID).subscribe(res => {

          this.obserCustomer.getSalesManagerCustomers(res.territoryId, res.salesRepId).subscribe(res => {
            var FilteredList = res;
            console.log(FilteredList);
            this.agGrid.gridOptions.api.setRowData(FilteredList);
          });

        });

    }

    else {
      this.Admin = false;
      /* this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(
        res => {
          this.LoginedSalesRepID = res;
          if (res != 0) {
            this.rowData = this.obserCustomer.GetCustByLevel();
          }
        }
      ); */
      this.Status = 0;
      this.OriginalID = 0;
    }
  }

  CustomerData() {
    this.showCustomerData = !this.showCustomerData;
  }
  CustomerAdress() {
    this.showCustomerAdress = !this.showCustomerAdress;
  }

  hide() {
    this.modalRef.hide();
  }
  hideCustomerProductGroupPerYear() {
    this.modalRefCustomerProductGroupPerYear.hide();
  }
  resetCustomer() {
    this.obserCustomer.getMax().subscribe(x => {
      this.MaxID = x;
      this.MaxIDCopy = x + 1;
    }
    );
    this.obserCustomer.obIcustomer =
    {
      customerId: 0,
      companyName: null,
      companyLatName: null,
      customerName: null,
      customerLatName: null,
      contactName: null,
      phone: null,
      custClassId: 0,
      foxNo: null,
      mobile: null,
      facebook: null,
      email: null,
      territoryId: 0,
      sectorId: 0,
      governorateId: 0,
      regionId: 0,
      salesRepId: 0,
      xCoordinte: 0,
      yCoordinte: 0,
      adress: null,
      productGroupNotes: null,
      salesFieldNotes: null,
      status: 0,
      originalID: 0,
      actualID: this.MaxIDCopy,
      dateAndTime: new Date(),
      CreateDateAndTime:new Date(),
    };

  }
  resetCustomerNoteTypes() {
    this.obserCustomerNoteTypesService.oboneCustomerNoteTypes =
    {
      noteTypesId: 0,
      customerId: 0,
      noteTypesDeception: '',
      trxDate: ''
    };
  }
  resetCustomerProductGroupPerYearService() {
    this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear =
    {
      productGroupId: null,
      customerId: 0,
      year: null,
      amount: null
    };
  }
  //#region select
  Configselect() {
    if (this.LoginedGroupIDCustomer == 1) {
      this.obserTerritory.GetAlldata().subscribe(orders => {
        this.Territorys = orders;
      });
    }
    else {
      this.obserTerritory.getBySales(this.LoginedSalesRepID).subscribe(orders => {
        this.Territorys = orders;
      });
    }

    this.onnoteTypes.GetAlldata().subscribe(orders => {
      this.noteTypes = orders;
      // tslint:disable-next-line: forin
      for (const i in this.noteTypes) {
        this.noteTypesselect.push({
          noteTypeId: this.noteTypes[i].noteTypeId,
          noteTypeLatName: this.noteTypes[i].noteTypeLatName
        });
      }

    });
    // this.obsergovernorateService.GetAlldata().subscribe(orders => {
    //   this.governorates = orders;
    // });
    this.obSalesFieldService.GetAlldata().subscribe(orders => {
      this.ItemsSalesField = orders;
    });
    this.obProductGroupService.GetAlldata().subscribe(orders => {
      this.ItemsProductGroup = orders;
      // tslint:disable-next-line: forin
      for (const i in this.ItemsProductGroup) {
        this.ItemsProductGroupselect.push({
          productGroupId: this.ItemsProductGroup[i].productGroupId,
          productGroupLatName: this.ItemsProductGroup[i].productGroupLatName
        });
      }
    });
    this.obCompetitionCompaniesService.GetAlldata().subscribe(orders => {
      this.ItemsCompetitionCompanies = orders;
    });
    this.obsercustClassService.GetAlldata().subscribe(orders => {
      this.custClass = orders;
    });
    this.rsetSalesFields();
    this.rsetProductGroup();
    this.rsetCompetitionCompanies();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'salesFieldId',
      textField: 'salesFieldLatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.ProductGroupSettings = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupLatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.CompetitionCompaniesSettings = {
      singleSelection: false,
      idField: 'competitionCompanyId',
      textField: 'competitionCompanyLatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }
  onItemsCompetitionCompaniesSelect(item: any) {

  }
  onItemsCompetitionCompaniesSelectAll(items: any) {
  }
  onItemsSalesFieldSelect(item: any) {

  }
  onItemsProductGroupSelect(items: any) {
  }
  onItemsProductGroupSelectAll(item: any) {

  }

  onItemsSalesFieldSelectAll(items: any) {
  }
  onChangeSelectionxgovernorate(selected) {
    this.Gchoosen = true;
    this.GchoosenNum = selected;
    this.obserCustomer.obIcustomer.regionId = 0;
    this.regions = [];
    // tslint:disable-next-line: radix
    this.obserCustomer.obIcustomer.governorateId = parseInt(selected);
    if (this.LoginedGroupIDCustomer != 1) {
      this.obserregionService.getBySalesG(this.LoginedSalesRepID, this.obserCustomer.obIcustomer.governorateId)
        .subscribe(xc => { this.regions = xc; });
    }
    else {
      this.obserregionService.getone(selected)
        .subscribe(xc => { this.regions = xc; });
    }

    this.SalesRepFunc();
  }
  onChangeSelectionregion(selected) {
    this.Rchoosen = true;
    this.RchoosenNum = selected;

    // tslint:disable-next-line: radix
    this.obserCustomer.obIcustomer.regionId = parseInt(selected);
    this.SalesRepFunc();
  }

  SalesRepFunc() {
    if (this.Rchoosen == true && this.Gchoosen == true && this.Schoosen == true && this.Tchoosen == true) {
      this.GetSalesByPlaceFun(this.GchoosenNum, this.RchoosenNum, this.TchoosenNum, this.SchoosenNum);


    }
    else this.salesRep = [];
  }
  GetSalesByPlaceFun(G, R, T, S) {
    this.salesRep = [];
    this.SerSalesRep.GetSalesByFullPlace(G, T, S, R).subscribe
      (res => {
        this.salesRep = res;
      });

  }

  onChangeSelectionSaleRep(selected) {

    // tslint:disable-next-line: radix
    this.obserCustomer.obIcustomer.salesRepId = parseInt(selected);
  }
  onChangeSelectionnoteTypes(selected) {
    // tslint:disable-next-line: radix
    this.obserCustomerNoteTypesService.oboneCustomerNoteTypes.noteTypesId = parseInt(selected);
  }
  onChangeSelectionCustomerProductGroupPerYear(selected) {
    // tslint:disable-next-line: radix
    this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear.productGroupId = parseInt(selected);
  }
  onChangeSelectionyear(selected) {
    // tslint:disable-next-line: radix
    this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear.year = parseInt(selected);
  }
  rsetCompetitionCompanies() {
    this.obserCustomerCompetitionCompaniespservice.obICustomerCompetition = [];

  }
  rsetProductGroup() {
    this.obserCustomerProductGroupservice.obICustomerProductGroup = [];

  }
  rsetSalesFields() {
    this.obserCustomerSalesFieldService.obICustomerSalesField = [];

  }
  saveselectable() {
    // tslint:disable-next-line: forin
    for (const i in this.obserCustomerCompetitionCompaniespservice.obICustomerCompetition) {
      this.obserCustomerCompetitionCompaniespservice.obICustomerCompetition[i].customerId
        = this.obserCustomer.obIcustomer.customerId;
    }
    this.obserCustomerCompetitionCompaniespservice.postdata().subscribe(rw => {
    });
    this.rsetCompetitionCompanies();
    // tslint:disable-next-line: forin
    for (const i in this.obserCustomerProductGroupservice.obICustomerProductGroup) {
      this.obserCustomerProductGroupservice.obICustomerProductGroup[i].customerId
        = this.obserCustomer.obIcustomer.customerId;
    }
    this.obserCustomerProductGroupservice.postdata().subscribe(rw => {
    });
    this.rsetProductGroup();
    // tslint:disable-next-line: forin
    for (const i in this.obserCustomerSalesFieldService.obICustomerSalesField) {
      this.obserCustomerSalesFieldService.obICustomerSalesField[i].customerId
        = this.obserCustomer.obIcustomer.customerId;
    }
    this.obserCustomerSalesFieldService.postdata().subscribe(rw => {
    });
    this.rsetSalesFields();
  }
  //#endregion

  //#region  entery Area
  insertFooterRow(template: TemplateRef<any>) {
    this.resetCustomerNoteTypes();
    this.update = 0;
    this.title = 'Add';
    const items = [];
    // tslint:disable-next-line: only-arrow-functions
    this.gridApiOption.forEachNode(function (node) {
      items.push(node.data);
    });
    if (items.length > 0) {
      this.obserCustomerNoteTypesService.oboneCustomerNoteTypes.noteTypesId =
        Math.max.apply(Math, items.map(function (o) { return o.noteTypesId; })) + 1;

    }
    else {
      this.obserCustomerNoteTypesService.oboneCustomerNoteTypes.noteTypesId = 1;
    }
    this.modalRef = this.modalService.show(template);
  }
  insertFooterRowCustomerProductGroupPerYear(template: TemplateRef<any>) {
    this.resetCustomerProductGroupPerYearService();
    this.updateCustomerProductGroupPerYear = 0;
    this.title = 'Add';
    const items = [];
    // tslint:disable-next-line: only-arrow-functions
    this.gridApiOptionCustomerProductGroupPerYear.forEachNode(function (node) {
      items.push(node.data);
    });
    if (items.length > 0) {
      this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear.productGroupId =
        Math.max.apply(Math, items.map(function (o) { return o.productGroupId; })) + 1;

    }
    else {
      this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear.productGroupId = 1;
    }
    this.modalRefCustomerProductGroupPerYear = this.modalService.show(template);
  }
  UpdateFooterRowCustomerProductGroupPerYear(templateCustomerProductGroupPerYear: TemplateRef<any>) {
    const selectedRows1 = this.gridApiOptionCustomerProductGroupPerYear.getSelectedRows();
    if (selectedRows1 != null && selectedRows1.length === 1) {
      this.updateCustomerProductGroupPerYear = 1;
      this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear = selectedRows1[0];
      this.title = 'Edit';
      this.modalRefCustomerProductGroupPerYear = this.modalService.show(templateCustomerProductGroupPerYear);
    }
    else {

    }

  }
  onSubmitCustomerProductGroupPerYear(CustomerProductGroupPerYear: NgForm) {
    this.isSubmittedCustomerProductGroupPerYear = CustomerProductGroupPerYear.invalid;
    if (this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear.year === 0 ||
      this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear.productGroupId === 0
      || this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear.amount <= 0

    ) {
      this.isSubmittedCustomerProductGroupPerYear = true;
    }


    if (!this.isSubmittedCustomerProductGroupPerYear) {
      if (this.updateCustomerProductGroupPerYear === 0) {
        this.agGridinsertCustomerProductGroupPerYear.api.updateRowData({

          add: [this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear]
        });
      }
      else {
        this.agGridinsertCustomerProductGroupPerYear.api.updateRowData({
          update: [this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear]
        });
      }
      this.hideCustomerProductGroupPerYear();
    }
  }
  UpdateFooterRow(template: TemplateRef<any>) {
    const selectedRows = this.gridApiOption.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.update = 1;
      this.obserCustomerNoteTypesService.oboneCustomerNoteTypes = selectedRows[0];
      this.title = 'Edit';
      this.modalRef = this.modalService.show(template);
    }
    else {

    }

  }
  onSubmit(f: NgForm) {



    /*  if (!this.Admin && this.obserCustomer.obIcustomer.customerId != 0) {
       this.OriginalID = this.obserCustomer.obIcustomer.customerId;
       this.obserCustomer.obIcustomer.customerId = 0;
       this.Status = 2;
     } */
    this.obserCustomer.obIcustomer.status = 1;
    this.obserCustomer.obIcustomer.originalID = 0;

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {
      if (this.obserCustomer.obIcustomer.customerId == null ||
        this.obserCustomer.obIcustomer.customerId === 0) {
        this.obserCustomer.postdata().subscribe(res => {
          this.obserCustomer.obIcustomer = res;
          const key = this.obserCustomer.obIcustomer.customerId;
          const items = [];
          // tslint:disable-next-line: only-arrow-functions
          this.gridApiOption.forEachNode(function (node) {
            items.push(node.data);
          });
          this.obserCustomerNoteTypesService.obICustomerNoteTypes = items;
          // tslint:disable-next-line: forin
          for (const i in this.obserCustomerNoteTypesService.obICustomerNoteTypes) {
            this.obserCustomerNoteTypesService.obICustomerNoteTypes[i].customerId = key;
          }

          this.obserCustomerNoteTypesService.postdata().subscribe(rw => {
          });

          const itemsCustomerProductGroupPerYear = [];
          // tslint:disable-next-line: only-arrow-functions
          this.gridApiOptionCustomerProductGroupPerYear.forEachNode(function (node) {
            itemsCustomerProductGroupPerYear.push(node.data);
          });
          this.obserCustomerProductGroupPerYearService.obICustomerProductGroupPerYear = itemsCustomerProductGroupPerYear;
          // tslint:disable-next-line: forin
          for (const i in this.obserCustomerProductGroupPerYearService.obICustomerProductGroupPerYear) {
            this.obserCustomerProductGroupPerYearService.obICustomerProductGroupPerYear[i].customerId = key;
          }

          this.obserCustomerProductGroupPerYearService.postdata().subscribe(rw => {
          });
          // tslint:disable-next-line: forin
          this.saveselectable();
          this.resetCustomer();
          this.resetCustomerNoteTypes();
          this.resetCustomerProductGroupPerYearService();
          this.enterymode = 0;
          this.IsAdmin();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);

        }
          , err => {

            setTimeout(() => {

              this.spinner.hide();
            }, 1000);
          });
      }
      else {

        this.obserCustomer.putdata().subscribe(res => {
          //  this.rowData = this.obserNoteType.GetAlldata();
          this.obserCustomer.obIcustomer = res;
          this.saveselectable();

          const key = this.obserCustomer.obIcustomer.customerId;
          this.obserCustomerNoteTypesService.Delete(this.obserCustomer.obIcustomer.customerId)
            .subscribe(re => {
              const items = [];
              // tslint:disable-next-line: only-arrow-functions
              this.gridApiOption.forEachNode(function (node) {
                items.push(node.data);
              });
              this.obserCustomerNoteTypesService.obICustomerNoteTypes = items;
              // tslint:disable-next-line: forin
              for (const i in this.obserCustomerNoteTypesService.obICustomerNoteTypes) {
                this.obserCustomerNoteTypesService.obICustomerNoteTypes[i].customerId = key;
              }

              this.obserCustomerNoteTypesService.postdata().subscribe(rw => {
              });
              this.resetCustomerNoteTypes();
            });

          this.obserCustomerProductGroupPerYearService.Delete(this.obserCustomer.obIcustomer.customerId)
            .subscribe(re => {
              const itemsCustomerProductGroupPerYear = [];
              // tslint:disable-next-line: only-arrow-functions
              this.gridApiOptionCustomerProductGroupPerYear.forEachNode(function (node) {
                itemsCustomerProductGroupPerYear.push(node.data);
              });
              this.obserCustomerProductGroupPerYearService.obICustomerProductGroupPerYear = itemsCustomerProductGroupPerYear;
              // tslint:disable-next-line: forin
              for (const i in this.obserCustomerProductGroupPerYearService.obICustomerProductGroupPerYear) {
                this.obserCustomerProductGroupPerYearService.obICustomerProductGroupPerYear[i].customerId = key;
              }

              this.obserCustomerProductGroupPerYearService.postdata().subscribe(rw => {
              });
              this.resetCustomerProductGroupPerYearService();
            });


          this.enterymode = 0;
          this.IsAdmin();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
          , err => {

            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          });
      }
    }
    setTimeout(() => {

      this.spinner.hide();
    }, 1000);

  }
  onSubmitCustomerNoteTypes(CustomerNoteTypes: NgForm) {
    this.isSubmitted = CustomerNoteTypes.invalid;

    if (!this.isSubmitted) {
      if (this.update === 0) {
        this.agGridinsert.api.updateRowData({

          add: [this.obserCustomerNoteTypesService.oboneCustomerNoteTypes]
        });
      }
      else {
        this.agGridinsert.api.updateRowData({
          update: [this.obserCustomerNoteTypesService.oboneCustomerNoteTypes]
        });
      }
      this.hide();
    }



  }
  DeleteCurrentRecord(index: number) {
    if (confirm('Are you sure to delete')) {
      {
        this.spinner.show();
        this.obserCustomerProductGroupservice.Delete(index).subscribe((res => {
          this.obserCustomerSalesFieldService.Delete(index).subscribe();
          this.obserCustomerCompetitionCompaniespservice.Delete(index).subscribe();
          this.obserCustomerNoteTypesService.Delete(index).subscribe();
          this.obserCustomerProductGroupPerYearService.Delete(index).subscribe();
          this.obserCustomer.Delete(index).subscribe((data => {
            this.enterymode = 0;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
            this.resetCustomer();
            this.rsetCompetitionCompanies();
            this.rsetSalesFields();
            this.rsetProductGroup();
            this.resetCustomerNoteTypes();
            this.resetCustomerProductGroupPerYearService();
          }), (err => {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);

          })
          );
        }), (error => {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);

        }));
      }
    }

  }
  CancelSave() {
    this.enterymode = 0;
    this.resetCustomer();
    // this.rowData = this.obserCustomer.GetAlldata();
    // this.IsAdmin();
    this.gridApidisplay?.deselectAll();

  }
  onChangeSelection(selected) {
    // tslint:disable-next-line: radix
    this.obserCustomer.obIcustomer.customerId = parseInt(selected);
  }

  //#endregion

  //#region Grid insert option


  onChangeSelectionterritory(selected) {
    // tslint:disable-next-line: radix
    this.Tchoosen = true;
    this.TchoosenNum = selected;
    this.obserCustomer.obIcustomer.territoryId = parseInt(selected);
    this.obserCustomer.obIcustomer.sectorId = 0;
    this.obserCustomer.obIcustomer.governorateId = 0;
    this.obserCustomer.obIcustomer.regionId = 0;
    this.sectors = [];
    this.governorates = [];
    this.regions = [];
    if (this.LoginedGroupIDCustomer != 1) {
      this.obserSectorService.getBySalesT(this.LoginedSalesRepID, this.obserCustomer.obIcustomer.territoryId)
        .subscribe(xc => {
          this.sectors = xc;

        });
    }
    else {
      this.obserSectorService.getone(this.obserCustomer.obIcustomer.territoryId)
        .subscribe(xc => {
          this.sectors = xc;

        });
    }

    this.SalesRepFunc();
  }
  onChangeSelectionSector(selected) {
    // tslint:disable-next-line: radix
    this.Schoosen = true;
    this.SchoosenNum = selected
    this.obserCustomer.obIcustomer.sectorId = parseInt(selected);
    this.obserCustomer.obIcustomer.regionId = 0;
    this.obserCustomer.obIcustomer.governorateId = 0;

    this.governorates = [];
    this.regions = [];

    if (this.LoginedGroupIDCustomer != 1) {
      this.obsergovernorateService.getBySalesS(this.LoginedSalesRepID, this.obserCustomer.obIcustomer.sectorId)
        .subscribe(xc => {
          this.governorates = xc;

        });
    }
    else {
      this.obsergovernorateService.FindByTerritoryandse(
        this.obserCustomer.obIcustomer.territoryId,
        selected
      ).subscribe(orders => {
        this.governorates = orders;
      });
    }

    this.SalesRepFunc();
  }
  onChangeSelectioncustClassId(selected) {
    // tslint:disable-next-line: radix
    this.obserCustomer.obIcustomer.custClassId = parseInt(selected);
  }
  deleteSelectedRows() {
    const alertRow = this.gridApiOption.getSelectedRows();
    this.agGridinsert.api.updateRowData({ remove: [alertRow[0]] });
  }
  deleteSelectedRowsCustomerProductGroupPerYear() {
    const alertRow = this.gridApiOptionCustomerProductGroupPerYear.getSelectedRows();
    this.agGridinsertCustomerProductGroupPerYear.api.updateRowData({ remove: [alertRow[0]] });
  }
  onGridReadyinsert(params) {
    this.gridApiOption = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onGridReadyinsertCustomerProductGroupPerYear(params) {
    this.gridApiOptionCustomerProductGroupPerYear = params.api;
    this.gridColumnApiCustomerProductGroupPerYear = params.columnApi;
  }
  onSelectionChangedinsert(params) {
    const selectedRows = this.gridApiOption.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.obserCustomerNoteTypesService.oboneCustomerNoteTypes = selectedRows[0];
    }
  }
  onSelectionChangedinsertCustomerProductGroupPerYear(params) {
    const selectedRows1 = this.gridApiOptionCustomerProductGroupPerYear.getSelectedRows();
    if (selectedRows1 != null && selectedRows1.length === 1) {
      this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear = selectedRows1[0];
    }
  }
  //#endregion


  //#region GridShow Data
  PostRecordArea() {
    this.enterymode = 1;
    this.resetCustomer();
    if (!this.Admin) {
      this.obserCustomer.obIcustomer.salesRepId = this.LoginedSalesRepID;
    }
    this.rsetSalesFields();
    this.rsetProductGroup();
    this.rsetCompetitionCompanies();
    this.rowDatainsert = this.obserCustomerNoteTypesService.getone(0);
    this.rowDatainsertCustomerProductGroupPerYear = this.obserCustomerProductGroupPerYearService.getone(0);

  }
  onrowDoubleClicked(params) {
    this.PutRecordArea();


  }
  PutRecordArea() {
    alert('ss')
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.enterymode = 1;
      this.governorates = this.sectors = this.regions = [];
      this.GetSalesByPlaceFun(selectedRows[0]['governorateId'], selectedRows[0]['regionId'],
        selectedRows[0]['territoryId'], selectedRows[0]['sectorId']);
      this.obserSectorService.getone(selectedRows[0]['territoryId'])
        .subscribe(xc => { this.sectors = xc; });

      this.obsergovernorateService.FindByTerritoryandse(
        selectedRows[0]['territoryId'],
        selectedRows[0]['sectorId']
      ).subscribe(orders => {
        this.governorates = orders;
      });

      this.obserregionService.getone(selectedRows[0]['governorateId'])
        .subscribe(xc => { this.regions = xc; });
      this.obserCustomer.obIcustomer = selectedRows[0];
      this.obserCustomer.obIcustomer.governorateId = parseInt(selectedRows[0]['governorateId']);
      this.latitude = this.obserCustomer.obIcustomer.xCoordinte;
      this.longitude = this.obserCustomer.obIcustomer.yCoordinte;

      this.obserCustomerSalesFieldService.getone(this.obserCustomer.obIcustomer.customerId).subscribe(o =>
        this.obserCustomerSalesFieldService.obICustomerSalesField = o
      );
      this.obserCustomerProductGroupservice.getone(this.obserCustomer.obIcustomer.customerId).subscribe(o =>
        this.obserCustomerProductGroupservice.obICustomerProductGroup = o
      );
      this.obserCustomerCompetitionCompaniespservice.getone(this.obserCustomer.obIcustomer.customerId).subscribe(o =>
        this.obserCustomerCompetitionCompaniespservice.obICustomerCompetition = o
      );
      this.rowDatainsert = this.obserCustomerNoteTypesService.getone(this.obserCustomer.obIcustomer.customerId);
      this.rowDatainsertCustomerProductGroupPerYear = this.obserCustomerProductGroupPerYearService.
        getone(this.obserCustomer.obIcustomer.customerId);




    }

    else {
      alert('No Selected Row to Update');
    }
  }

  onSelectionChanged(params) {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.obserCustomer.obIcustomer = selectedRows[0];
    }
  }
  onGridReady(params) {
    this.gridApidisplay = params.api;
    // this.rowData = this.obserCustomer.GetAlldata();
    this.IsAdmin();
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
        width: 300, sortable: true, filter: true,
        pivot: true,
        chartDataType: 'category'
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'الوصف الانجليزى' : 'Customer Lat Name', field: 'customerLatName',
        width: 300, sortable: true, filter: true
      },
      {
        headerName: this.Rtl ? ' اسم المنشأه عربي' : 'Company Name', field: 'companyName',
        width: 300, sortable: true, filter: true
      },
      {
        headerName: this.Rtl ? 'اسم المنشأه ' : 'Company Lat Name', field: 'companyLatName',
        width: 300, sortable: true, filter: true
      },
      {
        headerName: this.Rtl ? 'تاريخ انشاء العميل ' : 'Customer Ceration Date', field: 'dateAndTime',
        width: 300, sortable: true, filter: true,valueFormatter: function (params) {
          return moment(params.value).format('DD / MM / YYYY');
      }
    }
    ];
    this.columnDefsinsert = [
      {
        headerName: this.Rtl ? 'الكود' : 'customer Id', field: 'customerId',
        width: 0, sortable: true, filter: true, hide: true
      },
      {
        headerName: this.Rtl ? 'النوع' : 'Note Types', field: 'noteTypesId',
        width: 150, sortable: true, filter: true, editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: this.extractValues(this.noteTypesselect) },
        valueFormatter: this.selectFormatter.bind(this)
        ,
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'الوصف ' : 'Note Types Deception ', field: 'noteTypesDeception',
        width: 300, sortable: true, filter: true, editable: false
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'التاریخ' : 'Date', field: 'trxDate'
        , width: 100, sortable: true, filter: true, editable: false
      }
    ];


    this.columnDefsinsertCustomerProductGroupPerYear = [
      {
        headerName: this.Rtl ? 'الكود' : 'customer Id', field: 'customerId',
        width: 0, sortable: true, filter: true, hide: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'السنه ' : 'Year  ', field: 'year',
        width: 300, sortable: true, filter: true, editable: false
      },
      {
        headerName: this.Rtl ? 'النوع' : 'Note Types', field: 'productGroupId',
        width: 150, sortable: true, filter: true, editable: false,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: this.extractValuesCustomerProductGroupPerYear(this.ItemsProductGroupselect) },
        valueFormatter: this.selectFormatterCustomerProductGroupPerYear.bind(this)
        ,
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'الكميه' : 'amount', field: 'amount'
        , width: 100, sortable: true, filter: true, editable: false
      }
    ];

  }

  extractValuesCustomerProductGroupPerYear(mappings) {
    return Object.keys(mappings);
  }
  extractValues(mappings) {
    return Object.keys(mappings);
  }
  selectFormatterCustomerProductGroupPerYear(params) {
    const x = this.ItemsProductGroupselect.filter(x1 => x1.productGroupId === params.value);

    return x[0].productGroupLatName;
  }
  selectFormatter(params) {
    const x = this.noteTypesselect.filter((x1: { noteTypeId: any; }) => x1.noteTypeId === params.value);

    return x[0].noteTypeLatName;
  }
  //#endregion

}


