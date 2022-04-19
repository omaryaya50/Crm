import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from 'src/app/api.service/customer/customer-service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ProductGroupService } from 'src/app/api.service/codes-service/ProductGroup.service';
import { CustomerProductGroupService } from 'src/app/api.service/customer/CustomersProductGroup-service';
import { GovernorateService } from 'src/app/api.service/codes-service/governorate-service.service';
import { RegionService } from 'src/app/api.service/codes-service/region-service.service';
import { SectorService } from 'src/app/api.service/codes-service/Sector.service';
import { TerritoryService } from 'src/app/api.service/codes-service/territory.service';
import { element } from 'protractor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AllColumnsCustomerProductGroup } from 'src/app/Interfaces/View/all-columns-customer-product-group';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { InProductGroup } from 'src/app/Interfaces/codes-Interfaces/ProductGroup.interface';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-cust-procuct-grep',
  templateUrl: './cust-procuct-grep.component.html',
  styleUrls: ['./cust-procuct-grep.component.css']
})
export class CustProcuctGRepComponent implements OnInit {
  gridColumnApi: any;
  

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
    if (this.ReportName!=null&&this.ReportName != "") {
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




  LoginedUserIDCustomer: any;
  LoginedGroupIDCustomer: any;
  LoginedSalesRepID: number;


  ReportName: string = "";
  CustClass: any[] = [];
  CustID: any = 0;
  CustomerClassViewList: AllColumnsCustomerProductGroup[] = [];
  CustomerClassViewElement: AllColumnsCustomerProductGroup;
  ChoosenProductGroupList: InProductGroup[] = [];

  Governorate: any;
  Region: any;
  Territory: any;
  Sector: any;

  Gid: any = 0;
  Rid: any = 0;
  Sid: any = 0;
  Tid: any = 0;


  dropdownSettings2: IDropdownSettings = {};
  FilteredList: any[] = [];
  FilteredListall: any[] = [];
  Total: any;


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
  /*   { headerName: this.Rtl ? 'العميل' : 'Customer', field: 'customerName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'القطاع' : 'Territory', field: 'territoryName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاقليم' : 'Sector', field: 'sectorName', width: 200, sortable: true, filter: true },
   
    { headerName: this.Rtl ? 'المحافظه' : 'Governorate', field: 'governorateName', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'المركز' : 'region', field: 'regionName', width: 200, sortable: true, filter: true },
    
    { headerName: this.Rtl ? 'اصناف التعاملات' : 'Product Group', field: 'productGroupName', width: 250, sortable: true, filter: true },
    { headerName: this.Rtl ? 'اصناف التعاملات' : 'Product Group', field: 'productGroupID', width: 200, sortable: true, filter: true },
    */
  ];

  columnDefs2 = [
    { headerName: this.Rtl ? 'كود التصنيف' : 'Group', field: 'groupsId', width: 200, sortable: true, filter: true },
    { headerName: this.Rtl ? 'التصنيف' : 'Group', field: 'groups', width: 250, sortable: true, filter: true },
    { headerName: this.Rtl ? 'الاجمالي' : 'Total', field: 'total', width: 200, sortable: true, filter: true },
  ];

  constructor(public RegionServ: RegionService, public SectorServ: SectorService, public TerritoryServ: TerritoryService,
    public GovernorateServ: GovernorateService, public ProductGroupServ: ProductGroupService, public CustomerProductGroupServ: CustomerProductGroupService,
    private spinner: NgxSpinnerService, private translate: TranslateService, public SerSalesRep: SalesRepService,
    private modalService: BsModalService) {
    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {

    this.LoginedGroupIDCustomer = sessionStorage.getItem('GroupID');
    this.LoginedUserIDCustomer = sessionStorage.getItem('ID');

    if (this.LoginedGroupIDCustomer == 1) {
      this.TerritoryServ.GetAlldata().subscribe(res => {
        this.Territory = res;
      });

      this.ProductGroupServ.GetAlldata().subscribe(res => {
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

    /* this.ProductGroupServ.GetAlldata().subscribe(res => {
      this.CustClass = res;
    });

    this.GovernorateServ.GetAlldata().subscribe(res => {
      this.Governorate = res;
    });

    this.TerritoryServ.GetAlldata().subscribe(res => {
      this.Territory = res;
    }); */

    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.reset();

  }
  reset() {
    this.CustomerClassViewElement = {
      customerId: 0,
      customerName: '',
      territoryName: "",
      sectorName: "",
      governorateName: "",
      regionName: "",
      productGroupName: "",
      productGroupID: 0,
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
    this.FilteredList = [];
    this.gridColumnApi = params.columnApi;
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);
/* this.CustomerProductGroupServ.CustomerProductGroupViews().subscribe(res=>
  {
    this.FilteredList = [];
    this.FilteredList=res;
    
    this.agGrid.gridOptions.api.setRowData(this.FilteredList);
  }); */
 /*    if (this.LoginedGroupIDCustomer != 1) {
      this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
        this.LoginedSalesRepID = res;
        this.CustomerProductGroupServ.SalesManagerCustomerProductGroupView(this.LoginedSalesRepID).subscribe(res => {
          this.CustomerProductGroupServ.TotalCustomerProductsViews().subscribe(res1 => {
            res.forEach(element => {
              res1.forEach(element1 => {
                if (element.customerId == element1.customerId) {
                  this.CustomerClassViewElement.customerId = element1.customerId;
                  this.CustomerClassViewElement.customerName = element.customerName;
                  this.CustomerClassViewElement.territoryName = element.territoryName;
                  this.CustomerClassViewElement.sectorName = element.sectorName;
                  this.CustomerClassViewElement.governorateName = element.governorateName;
                  this.CustomerClassViewElement.regionName = element.regionName;
                  this.CustomerClassViewElement.productGroupName = element.productGroupName;
                  this.CustomerClassViewElement.productGroupID = element.productGroupID;
                  this.CustomerClassViewElement.company = element.company;
                  this.CustomerClassViewElement.adress = element.adress;
                  this.CustomerClassViewElement.territoryID = element.territoryID;
                  this.CustomerClassViewElement.sectorID = element.sectorID;
                  this.CustomerClassViewElement.governorateID = element.governorateID;
                  this.CustomerClassViewElement.regionID = element.regionID;
                  this.CustomerClassViewElement.total = element1.total;

                  this.CustomerClassViewList.push(this.CustomerClassViewElement);
                  this.reset();

                }

              });

            });


          });
        });
      });
    }
    else {
      this.CustomerProductGroupServ.CustomerProductGroupViews().subscribe(res => {
        this.CustomerProductGroupServ.TotalCustomerProductsViews().subscribe(res1 => {
          res.forEach(element => {
            res1.forEach(element1 => {
              if (element.customerId == element1.customerId) {
                this.CustomerClassViewElement.customerId = element1.customerId;
                this.CustomerClassViewElement.customerName = element.customerName;
                this.CustomerClassViewElement.territoryName = element.territoryName;
                this.CustomerClassViewElement.sectorName = element.sectorName;
                this.CustomerClassViewElement.governorateName = element.governorateName;
                this.CustomerClassViewElement.regionName = element.regionName;
                this.CustomerClassViewElement.productGroupName = element.productGroupName;
                this.CustomerClassViewElement.productGroupID = element.productGroupID;
                this.CustomerClassViewElement.company = element.company;
                this.CustomerClassViewElement.adress = element.adress;
                this.CustomerClassViewElement.territoryID = element.territoryID;
                this.CustomerClassViewElement.sectorID = element.sectorID;
                this.CustomerClassViewElement.governorateID = element.governorateID;
                this.CustomerClassViewElement.regionID = element.regionID;
                this.CustomerClassViewElement.total = element1.total;

                this.CustomerClassViewList.push(this.CustomerClassViewElement);
                this.reset();



              }

            });

          });


        });
      });
    } */


   

  }

  onGridReady2(params) {

    this.gridApi2 = params.api;

    this.Total = [];
    this.agGrid2.gridOptions.api.setRowData(this.Total);
    this.CustomerProductGroupServ.TotalForTotalViews().subscribe(res => {
      this.Total = res;
      this.agGrid2.gridOptions.api.setRowData(this.Total);
    });

  }

  Filter() {

    this.FilteredList = [];
    this.spinner.show();
 
    var xu=0;
    if(this.ChoosenProductGroupList!=null&&this.ChoosenProductGroupList.length>0)
    {
xu=this.ChoosenProductGroupList[0].productGroupId;
    }
    this.CustomerProductGroupServ.CustomerProductGroupViews(xu).subscribe(res=>
      {

        this.FilteredList = [];
        this.FilteredListall=res;
        var xc=Object.keys(this.FilteredListall[0]) 


this.gridApi.setColumnDefs([]);
this.columnDefs=[];
for(let element of xc){

 var xz=element.split(',');

 xz.forEach(element1 => {
  var col= { headerName: element1, field:element1, width: 200, sortable: true, filter: true }
  this.columnDefs.push(col);
 });


};

this.gridApi.setColumnDefs(this.columnDefs);
 /*  if(this.ChoosenProductGroupList!=null&&this.ChoosenProductGroupList.length>0)
  {
        this.FilteredList=  this.FilteredListall
  .filter(x => this.ChoosenProductGroupList.map(y => y.productGroupId).includes(x.productGroupID));
  }
  else
  this.FilteredList=  this.FilteredListall; */
  this.FilteredList=  this.FilteredListall;
        if (this.Gid != 0) {
          this.FilteredList=this.FilteredList.filter(x=>x.governorateID==this.Gid);
        }
        if (this.Tid != 0) {
          this.FilteredList=this.FilteredList.filter(x=>x.territoryID==this.Tid);
        }
        if (this.Sid != 0) {
          this.FilteredList=this.FilteredList.filter(x=>x.sectorID==this.Sid);
        }
        if (this.Rid != 0) {
          this.FilteredList=this.FilteredList.filter(x=>x.regionID==this.Rid);
        }
   
        this.agGrid.gridOptions.api.setRowData(this.FilteredList);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    
      });

return;
    if (this.ChoosenProductGroupList.length != 0) {
      this.ChoosenProductGroupList.forEach(Lelement => {

        this.CustomerClassViewList.forEach(element => {
          if (element.productGroupID == Lelement.productGroupId) {
            this.FilteredList.push(element);
          }

        });
      });

    }

    if (this.Gid != 0) {
      if (this.ChoosenProductGroupList.length != 0) {
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
      if (this.ChoosenProductGroupList.length != 0 || this.Gid != 0) {
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

    if (this.ChoosenProductGroupList.length == 0 && this.Tid == 0 && this.Sid == 0 && this.Rid == 0 && this.Gid == 0) {
      this.FilteredList = this.CustomerClassViewList;
    }
    let id = [];
    this.FilteredList.forEach(element => {

      if (!id.includes(element.customerId)) {
        id.push(element.customerId);
      }

    });

    let Copy = this.FilteredList;
    this.FilteredList = [];
    var i = -1;

    id.forEach((idelement, index) => {
      var x = {
        customerId:0,
        customerName: '',
        adress: '',
        sectorID:0,
        sectorName: '',
        regionID:0,
        regionName: '',
        governorateID:0,
        governorateName: '',
        territoryID:0,
        territoryName: '',
        company: '',
        productGroupName: '',
        total: 0
      };
      Copy.forEach(Listelement => {
        if (idelement == Listelement.customerId) {
          if (i != index) {
            x.customerId=Listelement.customerId;
            x.customerName = Listelement.customerName;
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

          x.productGroupName = x.productGroupName + "," + Listelement.productGroupName;

        }
      });
      this.FilteredList.push(x);
    });

    console.log(this.FilteredList);
    

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

