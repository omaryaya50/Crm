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

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { SalesSectorService } from 'src/app/api.service/codes-service/sales-sector.service';
import { SalesRegionService } from 'src/app/api.service/codes-service/sales-region.service';
import { SalesGovernorateService } from 'src/app/api.service/codes-service/SalesGovernorateService';
import { CustomerVisitsService } from 'src/app/api.service/codes-service/customer-visits.service';




const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  CustomerView: any;
  


 
  //#endregion

  Sid: any = 0;

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
  CustomerID: any = 0;

  Status: number;
  OriginalID: number;

  AllSales: any;
  AllCustomers: any;

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
  CustomerVisitsList: any[] = [];
  FromDate: any;
  ToDate: any;
  SalesID: any = 0;
  Sector: any;
  Rid: any = 0;

  Governorate: any;

  Territory: any;
  Tid: any = 0;
  FilteredList: any[] = [];
  CustID: any = 0;
  CustomerClassViewList: any;

  Gid: any = 0;

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


  constructor(public SalesRegionServ: SalesRegionService, public SectorServ: SalesSectorService,
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
    public CustomerVisitsSerc: CustomerVisitsService,
    public GovernorateServ: GovernorateService
  ) {




    this.Setgrid();

    this.LoginIDs();
/* 
    this.obsercustClassService.GetAlldata().subscribe(orders => {
      this.custClass = orders;
    });
    this.SerSalesRep.GetAlldata().subscribe(
      or => {
        this.AllSales = or;
        this.salesRep = or;
      }
    );
    
    this.obserCustomer.GetAlldata().subscribe(res => {
      this.AllCustomers = res;
    });

  } */
}

  ngOnInit(): void {
    this.resetCustomer();
    this.IsAdmin();

  }
  Filter() {


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
  onChangeSelectionT(selected) {
    this.Tid = parseInt(selected);
    if (this.LoginedGroupIDCustomer == 1) {
      this.obserSectorService.getone(this.Tid).subscribe(res => {
        this.Sector = res;
      });
    }
    else {
      this.obserSectorService.getBySalesT(this.LoginedSalesRepID, this.Tid).subscribe(res => {
        this.Sector = res;
      });
    }


  }
  onChangeSelectionSaleRep(selected) {

    // tslint:disable-next-line: radix
    this.obserCustomer.obIcustomer.salesRepId = parseInt(selected);
  }
 
  onChangeSelectionCustomerBySalesID(selected) {

    this.rowData = this.obserCustomer.getCustomersBySalesRep(selected);
  }

  onChangeSelectionByCustomer(selected) {
    this.CustomerID = parseInt(selected);
  }

  LoginIDs() {
    this.LoginedUserIDCustomer = localStorage.getItem('id');
    this.LoginedGroupIDCustomer = localStorage.getItem('GroupID');
    this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
      this.LoginedSalesRepID = res;

      this.Configselect();
    });

  }
  Configselect() {
    if (this.LoginedGroupIDCustomer == 1) {
      this.obserTerritory.GetAlldata().subscribe(orders => {
        this.Territorys = orders;
        console.log(this.Territorys);
      });
    }
    else {
      this.obserTerritory.getBySales(this.LoginedSalesRepID).subscribe(orders => {
        this.Territorys = orders;
        console.log(this.Territorys);
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
  rsetCompetitionCompanies() {
    this.obserCustomerCompetitionCompaniespservice.obICustomerCompetition = [];

  }
  rsetProductGroup() {
    this.obserCustomerProductGroupservice.obICustomerProductGroup = [];

  }
  rsetSalesFields() {
    this.obserCustomerSalesFieldService.obICustomerSalesField = [];

  }
  IsAdmin() {
    if (this.LoginedGroupIDCustomer == 1) {
      this.Admin = true;
   //   this.rowData = this.obserCustomer.GetAlldata();
   this.rowData =null;
      this.Status = 1;
      this.OriginalID = 0;
    }

    else if (this.LoginedGroupIDCustomer == 5) {
      //this.Admin = true;

      this.Status = 1;
      this.OriginalID = 0;

      this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
        this.LoginedSalesRepID = res;
        this.SerSalesRep.getone(this.LoginedSalesRepID).subscribe(res => {

          this.obserCustomer.getSalesManagerCustomers(res.territoryId, res.salesRepId).subscribe(res => {
            var FilteredList = res;
            console.log(FilteredList);
            this.agGrid.gridOptions.api.setRowData(FilteredList);
          });

        });
      });
    }

    else {
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

  






  
  

  //#endregion

  //#region  entery Area
  
  
  


  //#endregion

  //#region Grid insert option


 
 
  
  GetSalesByPlaceFun(G, R, T, S) {
    this.salesRep = [];
    this.SerSalesRep.GetSalesByFullPlace(G, T, S, R).subscribe
      (res => {
        this.salesRep = res;
      });

  }
  
 
 

 


  
  onrowDoubleClicked(params) {
    this.PutRecordArea();


  }
  PutRecordArea() {
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
  extractValuesCustomerProductGroupPerYear(mappings) {
    return Object.keys(mappings);
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
        width: 300, sortable: true, filter: true
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
      }
    ];
    this.columnDefsinsert = [
      {
        headerName: this.Rtl ? 'الكود' : 'customer Id', field: 'customerId',
        width: 0, sortable: true, filter: true, hide: true
      },
      {
        headerName: this.Rtl ? 'النوع' : 'Note Types', field: 'noteTypesId',
        width: 150, sortable: true, filter: true, editable: false,
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

 


  //#endregion

}


