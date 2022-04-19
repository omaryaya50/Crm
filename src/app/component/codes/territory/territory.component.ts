import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TerritoryService } from 'src/app/api.service/codes-service/territory.service';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { SectorService } from 'src/app/api.service/codes-service/Sector.service';
import { ActivatedRoute } from '@angular/router';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';
@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.css']
})
export class TerritoryComponent implements OnInit {
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
  title: string;
  gridColumnApi: any;
  showMsg = false;
  update = 0;
  public _IPrgPer:IPrgPer;

  constructor(public obserTerritory: TerritoryService, private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService,
    public obserSectorService: SectorService,private route: ActivatedRoute, public _GroupPermissionService:GroupPermissionService,) {
    this.Setgrid();
    this.rowData = this.obserTerritory.GetAlldata();
    this.resetSector();
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
    this.resetTerritory();
    this.route.data.subscribe(data => {
      this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, parseInt( localStorage.getItem("id"))).subscribe(x=>
       {
         this._IPrgPer=x;
       })
 
     });
  }
  hide() {
    this.modalRef.hide();
  }
  resetTerritory() {
    this.obserTerritory.obIterritory =
    {
      territoryName: null,
      territoryLatName: null,
      createUserid: null,
      dateAndTime: null,
      territoryId: 0
    };
  }
  resetSector() {
    this.obserSectorService.oboneSector
      = { sectorId: 0, territoryId: 0, sectorLatName: '', sectorName: '' };

  }

  //#region  entery Area
  UpdateFooterRow(template: TemplateRef<any>) {
    const selectedRows = this.gridApiOption.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.update = 1;
      this.title = 'Edit Sector';// + this.obserSectorService.oboneSector.sectorLatName ;
      this.modalRef = this.modalService.show(template);
    }
    else {

    }

  }

  insertFooterRow(template: TemplateRef<any>) {
    this.resetSector();
    this.update = 0;
    this.title = 'Add Sector';
    const items = [];
    // tslint:disable-next-line: only-arrow-functions
    this.gridApiOption.forEachNode(function (node) {
      items.push(node.data);
    });
    if (items.length > 0) {
      this.obserSectorService.oboneSector.sectorId =
        Math.max.apply(Math, items.map(function (o) { return o.sectorId; })) + 1;
      console.log(items);
      console.log(this.obserSectorService.oboneSector.sectorId);
    }
    else {
      this.obserSectorService.oboneSector.sectorId = 1;
      console.log(items);
    }
    this.modalRef = this.modalService.show(template);
  }
  CancelSave() {
    this.enterymode = 0;
    this.resetTerritory();
    this.resetTerritory();
    this.rowData = this.obserTerritory.GetAlldata();
    this.gridApidisplay?.deselectAll();

  }
  DeleteCurrentRecord(index: number) {
    if (confirm('Are you sure to delete')) {
      {
        this.spinner.show();
        this.obserSectorService.Delete(index).subscribe((res => {
          this.obserTerritory.Delete(index).subscribe((data => {
            this.enterymode = 0;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
            this.resetTerritory();
            this.resetSector();
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
      if (this.obserTerritory.obIterritory.territoryId == null ||
        this.obserTerritory.obIterritory.territoryId === 0) {
        this.obserTerritory.postdata().subscribe(res => {
          this.obserTerritory.obIterritory = res;


          const items = [];
          // tslint:disable-next-line: only-arrow-functions
          this.gridApiOption.forEachNode(function (node) {
            items.push(node.data);
          });
          this.obserSectorService.obISector = items;
          // tslint:disable-next-line: forin
          for (const i in this.obserSectorService.obISector) {
            this.obserSectorService.obISector[i].territoryId = this.obserTerritory.obIterritory.territoryId;
          }
          this.obserSectorService.postdata().subscribe(rw => {
          });
          // this.rowData = this.obserNoteType.GetAlldata();
          this.resetTerritory();
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

        this.obserTerritory.putdata().subscribe(res => {
          //  this.rowData = this.obserNoteType.GetAlldata();
          this.obserTerritory.obIterritory = res;
          const key = this.obserTerritory.obIterritory.territoryId;
          this.obserSectorService.Delete(this.obserTerritory.obIterritory.territoryId)
            .subscribe(re => {
              const items = [];
              // tslint:disable-next-line: only-arrow-functions
              this.gridApiOption.forEachNode(function (node) {
                items.push(node.data);
              });
              this.obserSectorService.obISector = items;
              // tslint:disable-next-line: forin
              for (const i in this.obserSectorService.obISector) {
                this.obserSectorService.obISector[i].territoryId = key;
              }

              this.obserSectorService.postdata().subscribe(rw => {
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
  onSubmitSector(Sector: NgForm) {
    this.isSubmitted = Sector.invalid;

    if (!this.isSubmitted) {
      if (this.update === 0) {
        this.agGridinsert.api.updateRowData({
          add: [this.obserSectorService.oboneSector]
        });
      }
      else {
        this.agGridinsert.api.updateRowData({
          update: [this.obserSectorService.oboneSector]
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
      this.obserSectorService.oboneSector = selectedRows[0];
    }
  }
  //#endregion

  //#region GridShow Data
  PostRecordArea() {
    this.enterymode = 1;
    this.resetTerritory();
    this.resetSector();
    this.rowDatainsert = this.obserSectorService.getone(0);
  }
  PutRecordArea() {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.enterymode = 1;
      this.obserTerritory.obIterritory = selectedRows[0];
      this.rowDatainsert = this.obserSectorService.getone(this.obserTerritory.obIterritory.territoryId);
    }
    else {
      alert('No Selected Row to delete');
    }
  }

  onSelectionChanged(params) {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.obserTerritory.obIterritory = selectedRows[0];
    }
  }
  onGridReady(params) {
    this.gridApidisplay = params.api;
    this.rowData = this.obserTerritory.GetAlldata();
  }
  Setgrid() {
    this.columnDefs = [
      {
        headerName: this.Rtl ? 'الكود' : 'Territory Id', field: 'territoryId', width: 150,
        sortable: true, filter: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'الوصف العربى' : 'territory Name', field: 'territoryName',
        width: 300, sortable: true, filter: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'الوصف الانجليزى' : 'territory Lat Name', field: 'territoryLatName',
        width: 300, sortable: true, filter: true
      }
    ];
    this.columnDefsinsert = [
      {
        headerName: this.Rtl ? 'الكود' : 'Territory Id', field: 'territoryId',
        width: 0, sortable: true, filter: true, hide: true
      },
      {
        headerName: this.Rtl ? 'الكود' : 'sector Id', field: 'sectorId',
        width: 150, sortable: true, filter: true, editable: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'اقاليم القطاع عربي':'sector name '  , field: 'sectorName',
        width: 300, sortable: true, filter: true, editable: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'اقاليم القطاع لاتيني' : 'sector Lat Name', field: 'sectorLatName'
        , width: 300, sortable: true, filter: true, editable: true
      }
    ];

  }
  //#endregion

}
