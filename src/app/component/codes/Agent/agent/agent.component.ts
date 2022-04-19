import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AgentService } from 'src/app/api.service/codes-service/agent.service';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';
import { ActivatedRoute } from '@angular/router';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

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
    { headerName: this.Rtl ? 'الكود' : 'Agent Code', field: 'agentCode', width: 150, sortable: true, filter: true },
    // tslint:disable-next-line: max-line-length
    { headerName: this.Rtl ? 'الوصف العربى' : 'Agent Name', field: 'agentName', width: 300, sortable: true, filter: true },
    // tslint:disable-next-line: max-line-length
    { headerName: this.Rtl ? 'الوصف الانجليزى' : 'Agent Lat Name', field: 'agentLatName', width: 300, sortable: true, filter: true }
  ];
  public _IPrgPer:IPrgPer;

  constructor(public AgentServe: AgentService, private spinner: NgxSpinnerService
    , private translate: TranslateService, private modalService: BsModalService, private route: ActivatedRoute, public _GroupPermissionService:GroupPermissionService,) {
    this.defaultColDef = { resizable: true };
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
    this.reset();
    this.resetAgent();
    this.rowData = this.AgentServe.GetAlldata();
    this.route.data.subscribe(data => {
      this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
       {
         this._IPrgPer=x;
       })
 
     });
  }

  reset() {
    this.AgentServe.Agent =
    {
      agentCode: 0,
      agentName: null,
      agentLatName: null,
    };
    this.gridApi?.deselectAll();
  }

  resetAgent() {
    this.AgentServe.IAgent = {
      agentName: null,
      agentLatName: null
    }
  }


  UpdateRecord(template: TemplateRef<any>) {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.AgentServe.Agent = selectedRows[0];
     // console.log(this.AgentServe.Agent);
      this.title = 'Edit';
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert('Must select Record to edit');
    }
  }

  Addnewrecord(template: TemplateRef<any>) {
    this.reset();
    this.title = 'Add';
    this.modalRef = this.modalService.show(template);
  }

  hide() {
    this.modalRef.hide();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.rowData = this.AgentServe.GetAlldata();
  }

  onSelectionChanged(params) {
    

    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.AgentServe.Agent = selectedRows[0]
    }
  }

  deleteSelectedRows() {
    const alertRow = this.gridApi.getSelectedRows();
    this.agGrid.api.updateRowData({ remove: [alertRow[0]] });
    this.reset();
  }

  Delete(index: number) {
    if (confirm('Are you sure to delete')) {
      {
        this.AgentServe.Delete(index).subscribe((data) => {
          this.rowData = this.AgentServe.GetAlldata();
          this.hide();
        }

        );
      }
    }
  }

  onSubmit(f: NgForm) {
    this.spinner.show();
    this.isSubmitted = f.invalid;
    if (!this.isSubmitted) {
      if (this.AgentServe.Agent.agentCode == 0) {
        this.AgentServe.IAgent.agentName = this.AgentServe.Agent.agentName;
        this.AgentServe.IAgent.agentLatName = this.AgentServe.Agent.agentLatName;

        this.AgentServe.postdata().subscribe(res => {
         
          this.rowData = this.AgentServe.GetAlldata();
          this.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);

        }
          , err => {
            console.log(err);
            setTimeout(() => {

              this.spinner.hide();
            }, 2000);
          });
      }
      else {
        this.AgentServe.putdata().subscribe(res => {
          this.rowData = this.AgentServe.GetAlldata();
          this.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
          , err => {
            console.log(err);
            setTimeout(() => {
              this.spinner.hide();
            }, 2000);
          });
      }
    }
    setTimeout(() => {

      this.spinner.hide();
    }, 1000);

  }
}
