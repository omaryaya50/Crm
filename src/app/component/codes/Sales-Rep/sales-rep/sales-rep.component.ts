import { Component, OnInit, ViewChild, TemplateRef, ɵConsole } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { TerritoryService } from 'src/app/api.service/codes-service/territory.service';
import { SectorService } from 'src/app/api.service/codes-service/Sector.service';
import { GovernorateService } from 'src/app/api.service/codes-service/governorate-service.service';
import { RegionService } from 'src/app/api.service/codes-service/region-service.service';
import { UserService } from 'src/app/api.service/security/users-service';
import { SalesSectorService } from 'src/app/api.service/codes-service/sales-sector.service';
import { SalesRegionService } from 'src/app/api.service/codes-service/sales-region.service';
import { SalesGovernorateService } from 'src/app/api.service/codes-service/SalesGovernorateService';
import { ActivatedRoute } from '@angular/router';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';

@Component({

  selector: 'app-sales-rep',
  templateUrl: './sales-rep.component.html',
  styleUrls: ['./sales-rep.component.css']
})
export class SalesRepComponent implements OnInit {

  modalRef: BsModalRef;
  isSubmitted = false;
  rowSelection = 'single';
  rowData: any;
  columnDefs: any;
  mode = true;
  Territorys: any;
  sectors: any;
  governorates: any;
  regions: any;
  Users: any;
  title: string;
  @ViewChild('template') template: TemplateRef<any>;
  oldID: any;
  newID: any;
  id: any;

  SalesRegions: any[] = [];
  SalesSectors: any[] = [];
  governorate: any[] = [];
  Salesgovernorate: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  private gridApi;
  @ViewChild('agGrid') agGrid: AgGridAngular;

  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  public _IPrgPer:IPrgPer;

  // tslint:disable-next-line: max-line-length
  constructor(public SalesRegionServ: SalesRegionService, public SalesSectorServ: SalesSectorService, public SerSalesRep: SalesRepService, private spinner: NgxSpinnerService,
    private translate: TranslateService, private modalService: BsModalService,
    public obserTerritory: TerritoryService, public obserSectorService: SectorService,
    public obsergovernorateService: GovernorateService, public obserregionService: RegionService,
    public objUser: UserService, public objSalesGovernorateService: SalesGovernorateService, private route: ActivatedRoute, public _GroupPermissionService:GroupPermissionService,) {
    this.obserTerritory.GetAlldata().subscribe(orders => {
      this.Territorys = orders;
    });
    this.Users = [];
    this.objUser.GetAllAvailable().subscribe(users => {
      this.Users = users;

    });

    this._IPrgPer=
    {
      delete:false,
      edit:false,
      excel:false,
      insert:false,
      print:false,
      progId:0,
      read:false,
      recordList:false,
      sysId:0,
      userId:0
    }

  }

  ngOnInit(): void {
    this.Setgrid();

    this.Configselect();

    this.objUser.GetAllAvailable().subscribe(users => {
      this.Users = users;

    });
    this.rowData = this.SerSalesRep.GetAlldata();
    this.reset();
    this.route.data.subscribe(data => {
      this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
       {
         this._IPrgPer=x;
       })
 
     });

  }
  hide() {
    this.modalRef.hide();

  }
  onChangeSelectionG(selected) {
    // tslint:disable-next-line: radix
    this.SerSalesRep.objSalesRep.governorateId = parseInt(selected);
    this.obserregionService.getone(this.SerSalesRep.objSalesRep.governorateId)
      .subscribe(xc => { this.regions = xc; });
  }
  onChangeSelectionT(selected) {
    // tslint:disable-next-line: radix
    this.SerSalesRep.objSalesRep.territoryId = parseInt(selected);
    this.SalesSectors = [];
    this.SalesRegions = [];
    this.objSalesGovernorateService.SalesGovernorateList = [];
    this.obserSectorService.getone(this.SerSalesRep.objSalesRep.territoryId)
      .subscribe(xc => {
        this.sectors = xc;
        this.obsergovernorateService.FindByTerritoryId(this.SerSalesRep.objSalesRep.territoryId,
          xc)
          .subscribe(xc1 => { this.governorate = xc1; });
      });

  }


  onItemSelect4(item: any) {
    if (item.length > 1) {
      this.SalesSectors = item;
    }

    this.objSalesGovernorateService.SalesGovernorateList = [];
    this.governorate = [];
    this.SalesRegions = [];
    this.obsergovernorateService.FindByTerritoryId(this.SerSalesRep.objSalesRep.territoryId,
      this.SalesSectors)
      .subscribe(xc => {
        this.governorate = xc;
      });
  }

  ongovernoratelistSelect(item: any) {
    this.SalesRegions = [];
    if (item.length > 1) {
      this.objSalesGovernorateService.SalesGovernorateList = item;
    }

    this.obserregionService.getMuti(this.objSalesGovernorateService.SalesGovernorateList)
      .subscribe(xc => {
        this.regions = xc;
      });

  }
  onChangeSelectionU(selected) {

    this.SerSalesRep.objSalesRep.userId = parseInt(selected);
    this.newID = selected;

  }
  Configselect() {
    this.obserTerritory.GetAlldata().subscribe(orders => {
      this.Territorys = orders;
    });

    this.obsergovernorateService.GetAlldata().subscribe(orders => {
      this.governorates = orders;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'regionId',
      textField: 'regionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: 'governorateId',
      textField: 'governorateName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'sectorId',
      textField: 'sectorName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  Addnewrecord(template: TemplateRef<any>) {
    this.reset();
    this.SerSalesRep.Getmax().subscribe(date => {
      this.SerSalesRep.objSalesRep.salesRepId = date + 1;
    }
    );
    this.Users = [];
    this.objUser.GetAllAvailable().subscribe(users => {
      this.Users = users;
    });

    this.SalesRegions = [];
    this.SalesSectors = [];
    this.objSalesGovernorateService.SalesGovernorateList = [];
    this.title = 'Add';
    this.mode = true;
    this.modalRef = this.modalService.show(template);
  }

  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);
    this.mode = false;

  }
  UpdateRecord(template: TemplateRef<any>) {

    this.oldID = this.SerSalesRep.objSalesRep.userId;
    this.newID = this.SerSalesRep.objSalesRep.userId;
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.reset();
      this.mode = false;
      this.Users = [];

      if (selectedRows[0].userId != null) {
        this.objUser.GetAvialableUsersnew(selectedRows[0].userId).subscribe(users => {
          this.Users = users;
        });
      }
      else {
        this.objUser.GetAvialableUsersnew(0).subscribe(users => {
          this.Users = users;
        });
      }

      this.SerSalesRep.objSalesRep = selectedRows[0];

      this.title = 'Edit';

      this.obserSectorService.getone(this.SerSalesRep.objSalesRep.territoryId)
        .subscribe(xc => {
          this.sectors = xc;
        });
      this.SalesSectorServ.GetBySalesIDview(this.SerSalesRep.objSalesRep.salesRepId).subscribe(res => {
        this.SalesSectors = res;
        this.obsergovernorateService.FindByTerritoryId(selectedRows[0].territoryId,
          res)
          .subscribe(xc => {
            this.governorate = xc;
          });
      });
      this.objSalesGovernorateService.GetBySalesIDview(selectedRows[0].salesRepId)
        .subscribe(xc => {
          this.objSalesGovernorateService.SalesGovernorateList = xc;
          this.obserregionService.getMuti(xc)
            .subscribe(xc => {
              this.regions = xc;
            });
        });



      this.SalesRegionServ.GetByRegionIDview(this.SerSalesRep.objSalesRep.salesRepId).subscribe(res => {
        this.SalesRegions = res;


      });

      this.modalRef = this.modalService.show(template);
    }
    else {
      alert('Must select Record to edit');
    }

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.SerSalesRep.GetAlldata();
  }

  Setgrid() {
    this.columnDefs = [
      {
        headerName: this.Rtl ? 'كود المندوب' : 'Id', field: 'salesRepId', width: 100,
        sortable: true, filter: true
      },
      {
        headerName: this.Rtl ? 'الوصف العربى' : 'Sales  Name', field: 'salesRepName',
        width: 300, sortable: true, filter: true
      },
      {
        headerName: this.Rtl ? 'الوصف الانجليزى' : 'Sales  Lat Name', field: 'salesRepLatName',
        width: 300, sortable: true, filter: true
      },
    ];
  }

  onSelectionChanged(params) {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.SerSalesRep.objSalesRep = selectedRows[0];
    }
  }

  postSalesRegionSectors(salesID) {

    // tslint:disable-next-line: forin
    for (const i in this.objSalesGovernorateService.SalesGovernorateList) {
      this.objSalesGovernorateService.SalesGovernorateList[i].salesRepId = salesID;
      this.objSalesGovernorateService.SalesGovernorateList[i].serial = 0;
    }

    this.objSalesGovernorateService.postdata().subscribe(
      res1 => {
      }
    );

    this.SalesRegions.forEach(element => {

      this.SalesRegionServ.SalesRegion.salesRepId = salesID;
      this.SalesRegionServ.SalesRegion.regionId = element.regionId;
      this.SalesRegionServ.postdata().subscribe();
    });

    this.SalesSectors.forEach(element => {
      this.SalesSectorServ.SalesSactor.salesRepId = salesID;
      this.SalesSectorServ.SalesSactor.sectorId = element.sectorId;
      this.SalesSectorServ.postdata().subscribe();
    });

    // this.SalesRegions = [];
    // this.SalesSectors = [];

  }
  onItemSelect(item: any) {

  }

  onSubmit(f: NgForm) {

    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted && this.objSalesGovernorateService.SalesGovernorateList.length > 0 &&
      this.SalesRegions.length > 0 && this.SalesSectors.length > 0) {

      if (this.mode === true) {

        this.SerSalesRep.salesexist(this.SerSalesRep.objSalesRep.salesRepId).subscribe(
          x => {
            if (x === false) {
              alert('هذا الكود مستخدم من قبل');
              return;
            }
          }
        );

        if (this.oldID !== this.newID) {

          this.objUser.GetOne(this.oldID, 0).subscribe(res => {

          });
          this.objUser.GetOne(this.newID, 1).subscribe(res => {

          });
        }

        
        this.SerSalesRep.postdata().subscribe(res => {

          this.postSalesRegionSectors(res.salesRepId);

          this.rowData = this.SerSalesRep.GetAlldata();
          this.hide();
          this.reset();

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

        if (this.oldID != this.newID) {

          this.objUser.GetOne(this.oldID, 0).subscribe(res => {

          });
          this.objUser.GetOne(this.newID, 1).subscribe(res => {

          });
        }
        this.SalesSectorServ.DeletebySales(this.SerSalesRep.objSalesRep.salesRepId).subscribe();
        this.SalesRegionServ.DeletebySales(this.SerSalesRep.objSalesRep.salesRepId).subscribe();
        this.SerSalesRep.putdata().subscribe(res => {
          const id = res.salesRepId;

          this.postSalesRegionSectors(id);
          // tslint:disable-next-line: forin


          this.rowData = this.SerSalesRep.GetAlldata();
          this.hide();
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

    // this.rowData=this.SerSalesRep.GetAlldata().subscribe();

  }


  reset() {

    this.SalesRegions = [];
    this.SalesSectors = [];
    this.objSalesGovernorateService.SalesGovernorateList = [];
    this.id = 1;
    this.SerSalesRep.Getmax().subscribe(date => {
      this.id = date;
    }
    );
    this.SerSalesRep.objSalesRep =
    {
      salesRepId: 0,
      salesRepName: null,
      salesRepLatName: null,
      territoryId: null,
      governorateId: null,
      userId: 0,
      type:1,
      locationPermission:false,

    };

    this.SalesRegionServ.SalesRegion = {
      regionId: 0,
      salesRepId: 0
    };

    this.SalesSectorServ.SalesSactor = {
      sectorId: 0,
      salesRepId: 0
    };
    this.gridApi?.deselectAll();
  }

  Delete(index: number) {
    if (confirm('Are You Sure ?')) {
      this.SalesSectorServ.DeletebySales(index).subscribe();
      this.SalesRegionServ.DeletebySales(index).subscribe();
      this.SerSalesRep.Delete(index).subscribe(data => {
        this.objUser.GetOne(this.oldID, 0).subscribe(res => {
          this.objUser.GetAllAvailable().subscribe(res => {
            this.Users = res;
          });
        }
        );

        this.rowData = this.SerSalesRep.GetAlldata();
        this.hide();
      });
    }

  }

}
