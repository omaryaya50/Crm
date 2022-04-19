import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { GovernorateService } from 'src/app/api.service/codes-service/governorate-service.service';
import { RegionService } from 'src/app/api.service/codes-service/region-service.service';
import { TerritoryService } from 'src/app/api.service/codes-service/territory.service';
import { SectorService } from 'src/app/api.service/codes-service/Sector.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute } from '@angular/router';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';

@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})
export class GovernorateComponent implements OnInit {


  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  modalRef: BsModalRef;
  isSubmitted = false;

  rowData: any;
  rowDatainsert: any;
  private gridApidisplay;
  private gridApiOption;
  columnDefsinsert: any;
  enterymode = 0;
  rowSelection = 'single';
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGridinsert') agGridinsert: AgGridAngular;
  columnDefs: any;
  Territorys: any;
  sectors: any;
  title: string;
  gridColumnApi: any;
  showMsg = false;
  update = 0;
  public _IPrgPer:IPrgPer;

  constructor(public obserGovernorate: GovernorateService, private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService,
    public obserRegionService: RegionService, public obserTerritory: TerritoryService,private route: ActivatedRoute, public _GroupPermissionService:GroupPermissionService
    , public obserSectorService: SectorService) {
    this.Setgrid();
    this.rowData = this.obserGovernorate.GetAlldata()
    this.obserTerritory.GetAlldata().subscribe(orders => {
      this.Territorys = orders;
    });
    this.resetRegion();
    this.obserSectorService.GetAlldata()
      .subscribe(xc => {
        this.sectors = xc;
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
    this.resetGovernorate();
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
  resetGovernorate() {
    this.obserGovernorate.obIGovernorate =
    {
      governorateName: null,
      governorateLatName: null,
      createUserid: null,
      dateAndTime: null,
      territoryId: 0,
      sectorId: 0
    };
  }
  resetRegion() {
    this.obserRegionService.oboneRegion
      = { regionId: 0, governorateId: 0, regionLatName: '', regionName: '' };

  }

  //#region  entery Area
  UpdateFooterRow(template: TemplateRef<any>) {
    const selectedRows = this.gridApiOption.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.update = 1;
      this.title = 'Edit Region';
      this.modalRef = this.modalService.show(template);
    }
    else {

    }

  }

  insertFooterRow(template: TemplateRef<any>) {
    this.resetRegion();
    this.update = 0;
    this.title = 'Add Region';
    this.obserRegionService.getMax().subscribe(x=>
      {
        this.obserRegionService.oboneRegion.regionId =x;
        const items = [];
        // tslint:disable-next-line: only-arrow-functions
         this.gridApiOption.forEachNode(function (node) {
          items.push(node.data);
        });
        if (items.length > 0) {
          const maxint =
            Math.max.apply(Math, items.map(function (o) { return o.regionId; })) + 1;
            if(maxint> this.obserRegionService.oboneRegion.regionId)
            this.obserRegionService.oboneRegion.regionId=maxint;
          
        }
       
        this.modalRef = this.modalService.show(template);
      });
  
  }
  CancelSave() {
    this.enterymode = 0;
    this.resetGovernorate();
    this.resetRegion();
    this.rowData = this.obserGovernorate.GetAlldata();
    this.gridApidisplay?.deselectAll();

  }
  DeleteCurrentRecord(index: number) {
    if (confirm('Are you sure to delete')) {
      {
        this.spinner.show();
        this.obserRegionService.Delete(index).subscribe((res => {
          this.obserGovernorate.Delete(index).subscribe((data => {
            this.enterymode = 0;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
            this.resetGovernorate();
            this.resetRegion();
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

  onSubmit(f: NgForm) {
    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {
      if (this.obserGovernorate.obIGovernorate.governorateId == null ||
        this.obserGovernorate.obIGovernorate.governorateId === 0) {
        this.obserGovernorate.postdata().subscribe(res => {
          this.obserGovernorate.obIGovernorate = res;


          const items = [];
          // tslint:disable-next-line: only-arrow-functions
          this.gridApiOption.forEachNode(function (node) {
            items.push(node.data);
          });
          this.obserRegionService.obIRegion = items;
          // tslint:disable-next-line: forin
          for (const i in this.obserRegionService.obIRegion) {
            this.obserRegionService.obIRegion[i].governorateId = this.obserGovernorate.obIGovernorate.governorateId;
          }
          this.obserRegionService.postdata().subscribe(rw => {
          });
          // this.rowData = this.obserNoteType.GetAlldata();
          this.resetGovernorate();
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
      else {

        this.obserGovernorate.putdata().subscribe(res => {
          //  this.rowData = this.obserNoteType.GetAlldata();
          this.obserGovernorate.obIGovernorate = res;
          const key = this.obserGovernorate.obIGovernorate.governorateId;
          this.obserRegionService.Delete(this.obserGovernorate.obIGovernorate.governorateId)
            .subscribe(re => {
              const items = [];
              // tslint:disable-next-line: only-arrow-functions
              this.gridApiOption.forEachNode(function (node) {
                items.push(node.data);
              });
              this.obserRegionService.obIRegion = items;
              // tslint:disable-next-line: forin
              for (const i in this.obserRegionService.obIRegion) {
                this.obserRegionService.obIRegion[i].governorateId = key;
              }

              this.obserRegionService.postdata().subscribe(rw => {
              });

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
    }
    setTimeout(() => {

      this.spinner.hide();
    }, 1000);

  }
  onChangeSelection(selected) {
    // tslint:disable-next-line: radix
    this.obserGovernorate.obIGovernorate.territoryId = parseInt(selected);
    this.obserSectorService.getone(this.obserGovernorate.obIGovernorate.territoryId)
      .subscribe(xc => {
        this.sectors = xc;

      });
  }
  onChangeSelectionSector(selected) {
    // tslint:disable-next-line: radix
    this.obserGovernorate.obIGovernorate.sectorId = parseInt(selected);

  }
  onSubmitRegion(Region: NgForm) {
    this.isSubmitted = Region.invalid;

    if (!this.isSubmitted) {
      if (this.update === 0) {
        this.agGridinsert.api.updateRowData({
          add: [this.obserRegionService.oboneRegion]
        });
      }

      else {
        this.agGridinsert.api.updateRowData({
          update: [this.obserRegionService.oboneRegion]
        });
      }
      this.hide();
    }



  }
  //#endregion

  //#region Grid insert option
  onGridReadyinsert(params) {
    this.gridApiOption = params.api;
    this.gridColumnApi = params.columnApi;
  }
  deleteSelectedRows() {
    const alertRow = this.gridApiOption.getSelectedRows();
    this.agGridinsert.api.updateRowData({ remove: [alertRow[0]] });
  }
  onSelectionChangedinsert(params) {
    const selectedRows = this.gridApiOption.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.obserRegionService.oboneRegion = selectedRows[0];
    }
  }
  //#endregion

  //#region GridShow Data
  PostRecordArea() {
    this.enterymode = 1;
    this.resetGovernorate();
    this.resetRegion();
    this.rowDatainsert = this.obserRegionService.getone(0);
  }
  PutRecordArea() {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.enterymode = 1;
      this.sectors = [];
      this.obserSectorService.getone(selectedRows[0]['territoryId'])
        .subscribe(xc => {
          this.sectors = xc;

        });

      this.obserGovernorate.obIGovernorate = selectedRows[0];
      this.rowDatainsert = this.obserRegionService.getone(this.obserGovernorate.obIGovernorate.governorateId);

    }
    else {
      alert('No Selected Row to delete');
    }
  }

  onSelectionChanged(params) {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.obserGovernorate.obIGovernorate = selectedRows[0];
    }
  }
  onGridReady(params) {
    this.gridApidisplay = params.api;
    this.rowData = this.obserGovernorate.GetAlldata();
  }
  Setgrid() {
    this.columnDefs = [
      {
        headerName: this.Rtl ? 'الكود' : 'Governorate Id', field: 'governorateId', width: 150,
        sortable: true, filter: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'الوصف العربى' : 'Governorate Name', field: 'governorateName',
        width: 300, sortable: true, filter: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'الوصف الانجليزى' : 'Governorate Lat Name', field: 'governorateLatName',
        width: 300, sortable: true, filter: true
      }
    ];
    this.columnDefsinsert = [
      {
        headerName: this.Rtl ? 'الكود' : 'Governorate Id', field: 'governorateId',
        width: 0, sortable: true, filter: true, hide: true
      },
      {
        headerName: this.Rtl ? 'الكود' : 'Region Id', field: 'regionId',
        width: 150, sortable: true, filter: true, editable: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'اسم الركز (المنطقة) عربي' : 'Region Name', field: 'regionName',
        width: 300, sortable: true, filter: true, editable: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? "اسم الركز (المنطقة) لاتيني": 'Region Lat Name', field: 'regionLatName'
        , width: 300, sortable: true, filter: true, editable: true
      }
    ];

  }
  //#endregion

}
