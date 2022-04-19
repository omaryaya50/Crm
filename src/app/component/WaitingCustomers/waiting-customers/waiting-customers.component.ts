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
import { Router } from '@angular/router';
import { TempCustomersService } from 'src/app/api.service/customer/temp-customers.service';
import { SalesSectorService } from 'src/app/api.service/codes-service/sales-sector.service';
import { SalesRegionService } from 'src/app/api.service/codes-service/sales-region.service';
//import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-waiting-customers',
  templateUrl: './waiting-customers.component.html',
  styleUrls: ['./waiting-customers.component.css']
  //providers:[NavbarComponent]
})

export class WaitingCustomersComponent implements OnInit {

  latitude: number;
  longitude: number;

  ViewList: any[] = [];

  WaitingListLength: any;
  SalesList: any;

  WaitingList = [];
  WaitingElementString: any;
  restriction: {
    latLngBounds: {
      north: 85.0,
      south: -85.0,
      west: -180.0,
      east: 180.0
    },
    strictBounds: true
  }
  MaxIDCopy: any;
  MaxID: number;
  Accepted: boolean;
  existing: Boolean = false;

  AllSales: any;

  ChoosenSalesID: number = null;

  temp: any;
  result: any;

  Status: number = null;
  StatusList = [
    { name: "All", value: 3 },
    { name: "New", value: 0 },
    { name: "Updated", value: 2 },];

  public selectedValue: { value: number; };
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
  rowDatainsert2: any;
  private gridApidisplay: { deselectAll: () => void; getSelectedRows: () => any; };
  private gridApiOption: { forEachNode: (arg0: { (node: any): void; (node: any): void; }) => void; getSelectedRows: () => any; };
  columnDefsinsert: any;
  enterymode = 0;
  rowSelection = 'single';
  rowSelectionCustomerProductGroupPerYear = 'single';
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGridinsert') agGridinsert: AgGridAngular;
  @ViewChild('agGridinsert2') agGridinsert2: AgGridAngular;
  @ViewChild('agGridinsertCustomerProductGroupPerYear') agGridinsertCustomerProductGroupPerYear: AgGridAngular;
  @ViewChild('agGridinsertCustomerProductGroupPerYear2') agGridinsertCustomerProductGroupPerYear2: AgGridAngular;
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
  rowDatainsertCustomerProductGroupPerYear2: any;
  columnDefsinsertCustomerProductGroupPerYear: any;
  StatusAcceptance: number;
  CopyOldID: number;
  Called: boolean;
  CalledID: number;
  MAxActualID: number;
  Gchoosen: boolean = false;
  GchoosenNum: any;
  Rchoosen: boolean = false;
  RchoosenNum: any;
  Tchoosen: boolean = false;
  TchoosenNum: any;
  Schoosen: boolean = false;
  SchoosenNum: any;
  oldregions:any;
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
    , public onnoteTypes: NoteTypeService, public SerSalesRep: SalesRepService, private router: Router,
    private TempService: TempCustomersService
  ) {

    //console.log('frist');
    this.Status = 3;

    this.Configselect();

    this.Setgrid();


    this.obsercustClassService.GetAlldata().subscribe(orders => {
      this.custClass = orders;
    });

    this.rowData = this.obserCustomer.getByStatus(this.Status);
    this.Accepted = true;

    this.SerSalesRep.GetAlldata().subscribe(
      or => {
        this.AllSales = or;
        this.salesRep = or;
      }
    );

  }

  ngOnInit(): void {

    this.resetCustomer();
    this.resetOldCustomer();
    this.resetTempCustomers();


  }

  // ngOnChanges(id): void {

  //   this.PutRecordArea(this.CalledID);

  // }

  resetTempCustomers() {
    this.TempService.temp = {
      customerId: 0,
      actualCustomerId: 0,
      status: 0,
      salesID: 0

    }

  }

  onChangeSelectionStatus() {

    this.Status = this.selectedValue.value;

    // this.rowData = this.obserCustomer.getByStatus(this.Status);
  }

  onChangeSelectionCustomerBySalesID(selected) {

    this.ChoosenSalesID = parseInt(selected);

    // this.rowData = this.obserCustomer.getCustomersBySalesRep(selected);
  }

  Filter() {

    this.ViewList = [];

    let List;

    if (this.Status != null && this.ChoosenSalesID == null) {
      this.obserCustomer.getByStatus(this.Status).subscribe(res => {
        this.ViewList = res;
        this.agGrid.gridOptions.api.setRowData(res);
      });
    }
    else if (this.Status == null && this.ChoosenSalesID != null) {
      List = this.obserCustomer.getCustomersBySalesRep(this.ChoosenSalesID).subscribe(res => {
        this.ViewList = res;
        this.agGrid.gridOptions.api.setRowData(res);
      });
    }

    else {
      let WaitedStatusList: any;

      this.obserCustomer.getByStatus(this.Status).subscribe(res => {
        WaitedStatusList = res;
        WaitedStatusList.forEach(element => {
          if (element.salesRepId == this.ChoosenSalesID) {
            this.ViewList.push(element);
          }
        });
        this.agGrid.gridOptions.api.setRowData(this.ViewList);
      });

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
      actualID: 0,
      dateAndTime: new Date(),

    };
  }


  resetOldCustomer() {

    this.obserCustomer.OldCustomer =
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
      actualID: 0,
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
  Configselect() {
    this.obserTerritory.GetAlldata().subscribe(orders => {
      this.Territorys = orders;
    });
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
    this.obsergovernorateService.GetAlldata().subscribe(orders => {
      this.governorates = orders;
    });
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
      textField: 'salesFieldName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.ProductGroupSettings = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.CompetitionCompaniesSettings = {
      singleSelection: false,
      idField: 'competitionCompanyId',
      textField: 'competitionCompanyName',
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
    this.obserregionService.getone(selected)
      .subscribe(xc => { this.regions = xc; });
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

    this.GetSalesByPlaceFun(
      this.obserCustomer.obIcustomer.governorateId,
      this.obserCustomer.obIcustomer.regionId,
      this.obserCustomer.obIcustomer.territoryId
      , this.obserCustomer.obIcustomer.sectorId);



  }
  onChangeSelectionSaleRep(selected: string) {

    // tslint:disable-next-line: radix
    this.obserCustomer.obIcustomer.salesRepId = parseInt(selected);
  }
  onChangeSelectionnoteTypes(selected: string) {
    // tslint:disable-next-line: radix
    this.obserCustomerNoteTypesService.oboneCustomerNoteTypes.noteTypesId = parseInt(selected);
  }
  onChangeSelectionCustomerProductGroupPerYear(selected: string) {
    // tslint:disable-next-line: radix
    this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear.productGroupId = parseInt(selected);
  }
  onChangeSelectionyear(selected: string) {
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
        = this.CopyOldID;
    }
    this.obserCustomerCompetitionCompaniespservice.postdata().subscribe(rw => {
    });
    this.rsetCompetitionCompanies();
    // tslint:disable-next-line: forin
    for (const i in this.obserCustomerProductGroupservice.obICustomerProductGroup) {
      this.obserCustomerProductGroupservice.obICustomerProductGroup[i].customerId
        = this.CopyOldID;
    }
    this.obserCustomerProductGroupservice.postdata().subscribe(rw => {
    });
    this.rsetProductGroup();
    // tslint:disable-next-line: forin
    for (const i in this.obserCustomerSalesFieldService.obICustomerSalesField) {
      this.obserCustomerSalesFieldService.obICustomerSalesField[i].customerId
        = this.CopyOldID;
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
    this.gridApiOption.forEachNode(function (node: { data: any; }) {
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
    this.gridApiOptionCustomerProductGroupPerYear.forEachNode(function (node: { data: any; }) {
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

  AddInTempCustomerTable() {

    this.TempService.temp.status = this.obserCustomer.obIcustomer.status;



    this.TempService.temp.salesID = this.obserCustomer.obIcustomer.salesRepId;


    if (this.obserCustomer.obIcustomer.originalID == 0) {
      this.TempService.temp.actualCustomerId = this.obserCustomer.obIcustomer.customerId;
    }
    else {
      this.TempService.temp.actualCustomerId = this.obserCustomer.obIcustomer.originalID;
    }


    this.TempService.GetAlldata().subscribe(
      res => {
        res.forEach(element => {
          if (element.actualCustomerId == this.TempService.temp.actualCustomerId) {
            this.existing = true;
          }
        });
        if (this.existing) {
          this.TempService.putdata().subscribe();
        }
        else {
          this.TempService.postdata().subscribe();
        }
      }
    );
  }

  Acceptance() {

    this.obserCustomer.obIcustomer.status = 1;

    if (this.obserCustomer.obIcustomer.originalID == 0) {
      this.CopyOldID = this.obserCustomer.obIcustomer.customerId;
    }
    else {
      this.CopyOldID = this.obserCustomer.obIcustomer.originalID;
    }

    this.obserCustomer.getMaxStatus().subscribe(res => {

      this.obserCustomer.obIcustomer.actualID = (res + 1);
    }
    );

    this.obserCustomer.putdata().subscribe(res => {



      this.AddInTempCustomerTable();

      this.obserCustomer.obIcustomer = res;

      this.saveselectable();

      const key = this.CopyOldID;
      this.obserCustomerNoteTypesService.Delete(this.CopyOldID)
        .subscribe(re => {
          const items = [];
          this.gridApiOption.forEachNode(function (node: { data: any; }) {
            items.push(node.data);
          });
          this.obserCustomerNoteTypesService.obICustomerNoteTypes = items;

          for (const i in this.obserCustomerNoteTypesService.obICustomerNoteTypes) {
            this.obserCustomerNoteTypesService.obICustomerNoteTypes[i].customerId = key;
          }

          this.obserCustomerNoteTypesService.postdata().subscribe(rw => {
          });
          this.resetCustomerNoteTypes();
        });

      this.obserCustomerProductGroupPerYearService.Delete(this.CopyOldID)
        .subscribe(re => {
          const itemsCustomerProductGroupPerYear = [];
          // tslint:disable-next-line: only-arrow-functions
          this.gridApiOptionCustomerProductGroupPerYear.forEachNode(function (node: { data: any; }) {
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
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
      , err => {
        console.log(err);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      });

  }


  onSubmit(f: NgForm) {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {
      this.Acceptance();
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
    if (confirm('Are you sure ?')) {
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
            console.log(err);
          })
          );
        }), (error => {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          console.log(error);
        }));
      }
    }

  }
  CancelSave() {
    this.enterymode = 0;
    this.resetCustomer();
    this.rowData = this.obserCustomer.getByStatus(this.Status);

    this.gridApidisplay?.deselectAll();

  }
  onChangeSelection(selected: string) {
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
    this.obserSectorService.getone(this.obserCustomer.obIcustomer.territoryId)
      .subscribe(xc => {
        this.sectors = xc;

      });
    this.SalesRepFunc();
  }
  onrowDoubleClicked(params) {
    this.PutRecordArea();


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
    this.obsergovernorateService.FindByTerritoryandse(
      this.obserCustomer.obIcustomer.territoryId,
      selected
    ).subscribe(orders => {
      this.governorates = orders;
    });
    this.SalesRepFunc();
  }
  onChangeSelectioncustClassId(selected: string) {
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
  onGridReadyinsert(params: { api: any; columnApi: any; }) {
    this.gridApiOption = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onGridReadyinsertCustomerProductGroupPerYear(params: { api: any; columnApi: any; }) {
    this.gridApiOptionCustomerProductGroupPerYear = params.api;
    this.gridColumnApiCustomerProductGroupPerYear = params.columnApi;
  }
  onSelectionChangedinsert(params: any) {
    const selectedRows = this.gridApiOption.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.obserCustomerNoteTypesService.oboneCustomerNoteTypes = selectedRows[0];
    }
  }
  onSelectionChangedinsertCustomerProductGroupPerYear(params: any) {
    const selectedRows1 = this.gridApiOptionCustomerProductGroupPerYear.getSelectedRows();
    if (selectedRows1 != null && selectedRows1.length === 1) {
      this.obserCustomerProductGroupPerYearService.oboneCustomerProductGroupPerYear = selectedRows1[0];
    }
  }
  //#endregion


  //#region GridShow Data

  GetSalesByPlaceFun(G, R, T, S) {
    this.salesRep = [];

    this.SerSalesRep.GetSalesByFullPlace(G, T, S, R).subscribe
      (res => {
        this.salesRep = res;
      });
  }

  GetOldSelectedTables() {

    this.obserCustomerSalesFieldService.getone(this.obserCustomer.OldCustomer.customerId).subscribe(o => {
      this.obserCustomerSalesFieldService.oldSalesField = o;
      //console.log(o);
    });
    this.obserCustomerProductGroupservice.getone(this.obserCustomer.OldCustomer.customerId).subscribe(o => {
      this.obserCustomerProductGroupservice.OldProductGroup = o;
      //console.log(o);
    });
    this.obserCustomerCompetitionCompaniespservice.getone(this.obserCustomer.OldCustomer.customerId).subscribe(o => {
      this.obserCustomerCompetitionCompaniespservice.OldCompetition = o;
      //console.log(o);
    });

    this.rowDatainsert2 = this.obserCustomerNoteTypesService.getone(this.obserCustomer.OldCustomer.customerId);

    this.rowDatainsertCustomerProductGroupPerYear2 = this.obserCustomerProductGroupPerYearService.
      getone(this.obserCustomer.OldCustomer.customerId);

    // this.obserSectorService.getone(this.obserCustomer.obIcustomer.territoryId)
    //   .subscribe(xc => { this.sectors = xc; });

    this.obserregionService.getone(this.obserCustomer.OldCustomer.governorateId)
      .subscribe(xc => { this.oldregions = xc; });

    // this.GetSalesByPlaceFun(this.obserCustomer.obIcustomer.governorateId, this.obserCustomer.obIcustomer.regionId,
    //   this.obserCustomer.obIcustomer.territoryId, this.obserCustomer.obIcustomer.sectorId);
  }

  GetSelectedTables() {

    this.obserCustomerSalesFieldService.getone(this.obserCustomer.obIcustomer.customerId).subscribe(o => {
      this.obserCustomerSalesFieldService.obICustomerSalesField = o;
      //console.log(o);
    });
    this.obserCustomerProductGroupservice.getone(this.obserCustomer.obIcustomer.customerId).subscribe(o => {
      this.obserCustomerProductGroupservice.obICustomerProductGroup = o;
      //console.log(o);
    });
    this.obserCustomerCompetitionCompaniespservice.getone(this.obserCustomer.obIcustomer.customerId).subscribe(o => {
      this.obserCustomerCompetitionCompaniespservice.obICustomerCompetition = o;
      //console.log(o);
    });

    this.rowDatainsert = this.obserCustomerNoteTypesService.getone(this.obserCustomer.obIcustomer.customerId);

    this.rowDatainsertCustomerProductGroupPerYear = this.obserCustomerProductGroupPerYearService.
      getone(this.obserCustomer.obIcustomer.customerId);

    this.obserSectorService.getone(this.obserCustomer.obIcustomer.territoryId)
      .subscribe(xc => { this.sectors = xc; });

    this.obserregionService.getone(this.obserCustomer.obIcustomer.governorateId)
      .subscribe(xc => { this.regions = xc; });

    this.GetSalesByPlaceFun(this.obserCustomer.obIcustomer.governorateId, this.obserCustomer.obIcustomer.regionId,
      this.obserCustomer.obIcustomer.territoryId, this.obserCustomer.obIcustomer.sectorId);
  }

  PutRecordArea() {

    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.enterymode = 1;

      this.obserCustomer.obIcustomer = selectedRows[0];
      //console.log(this.obserCustomer.obIcustomer);
      this.latitude = this.obserCustomer.obIcustomer.xCoordinte;
      this.longitude = this.obserCustomer.obIcustomer.yCoordinte;
      this.GetSelectedTables();

      //console.log("Updated",this.obserCustomer.obIcustomer);
      if (this.obserCustomer.obIcustomer.originalID != 0) {
        this.obserCustomer.getone(this.obserCustomer.obIcustomer.originalID).subscribe(res => {
          this.obserCustomer.OldCustomer = res;
          this.GetOldSelectedTables();
          //console.log("Old",this.obserCustomer.OldCustomer);
        });
      }
    }

    else {
      alert('No Selected Row to Update');
    }

    // else {
    //   console.log("Put Record " + this.enterymode);
    //   this.obserCustomer.getByStatus(3).subscribe(
    //     res => {
    //       res.forEach(element => {
    //         if (element.customerId == id) {
    //           this.obserCustomer.obIcustomer = element;
    //           this.GetSelectedTables();
    //         }
    //       });
    //     }
    //   );
    // }


  }

  onSelectionChanged(params: any) {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.obserCustomer.obIcustomer = selectedRows[0];
    }
  }
  onGridReady(params: { api: any; }) {
    this.gridApidisplay = params.api;
    this.rowData = this.obserCustomer.getByStatus(this.Status);

  }
  Setgrid() {
    this.columnDefs = [
      {
        headerName: this.Rtl ? 'كود العميل' : 'Customer Id', field: 'customerId', width: 200,
        sortable: true, filter: true
      },
      {
        headerName: this.Rtl ? 'كود العميل الرئيسي' : 'actual ID', field: 'originalID', width: 200,
        sortable: true, filter: true
      },
      {
        headerName: this.Rtl ? ' اسم المنشأه ' : 'Company Name', field: 'companyName',
        width: 300, sortable: true, filter: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'اسم العميل' : 'Customer Name', field: 'customerName',
        width: 300, sortable: true, filter: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? ' تليفون' : 'Phone', field: 'mobile',
        width: 300, sortable: true, filter: true
      },

      {
        headerName: this.Rtl ? ' المندوب' : 'Sales Representative', field: 'salesRepName',
        width: 300, sortable: true, filter: true
      },

      {
        headerName: this.Rtl ? 'التاريخ' : 'Date', field: 'dateAndTime',
        width: 300, sortable: true, filter: true,
        cellRenderer: (data) => {
          return data.value ? (new Date(data.value)).toLocaleString() : '';
        }

      },
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
        headerName: this.Rtl ? 'السنه ' : 'Year ', field: 'year',
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

  extractValuesCustomerProductGroupPerYear(mappings: any[]) {
    return Object.keys(mappings);
  }
  extractValues(mappings: Iselect[]) {
    return Object.keys(mappings);
  }
  selectFormatterCustomerProductGroupPerYear(params: { value: any; }) {
    const x = this.ItemsProductGroupselect.filter(x1 => x1.productGroupId === params.value);

    return x[0].productGroupLatName;
  }
  selectFormatter(params: { value: any; }) {
    const x = this.noteTypesselect.filter((x1: { noteTypeId: any; }) => x1.noteTypeId === params.value);

    return x[0].noteTypeLatName;
  }
  //#endregion

}
