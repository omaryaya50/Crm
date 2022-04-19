import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustClassService } from 'src/app/api.service/codes-service/CustClass.service';
import { NgxSpinnerService } from "ngx-spinner";
import { GenderCellRenderer } from './GenderCellRenderer ';
import { GridApi, RowNode, Module } from 'ag-grid-community';
import { CustClass } from 'src/app/Interfaces/codes-Interfaces/CustClass.Interface';
import { AgGridAngular } from 'ag-grid-angular';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';
import { ActivatedRoute } from '@angular/router';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';

@Component({
  selector: 'app-customerkind',
  templateUrl: './customerkind.component.html',
  styleUrls: ['./customerkind.component.scss']
})
export class CustomerkindComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  isSubmitted=false;
  public defaultColDef;
  frameworkComponents :any;
  title: string;
  modalRef: BsModalRef;
  private gridApi;
  rowData: any;
  rowsdata:CustClass[];
  public api: GridApi;
  rowSelection = 'single';
  public Rtl = localStorage.getItem('textDir') == 'ltr' ? false : true;
  public sports={ cclName : '', cclLatName: '', numberofVisits: 0 , periodforVisits : 1 };
   carMappings = {
    1: 'monthy',
    2: 'Quarterly',
   
  };
  columnDefs = [
    {headerName: this.Rtl ? 'الكود' : 'Ccl Code', field: 'custClassId',  width: 150 , sortable: true, filter: true},
    {headerName:this.Rtl ? 'الوصف العربى' : 'CCL Name', field: 'cclName',  width: 150 , sortable: true, filter: true },
    {headerName: this.Rtl ? 'الوصف الانجليزى': 'CCL Lat Name', field: 'cclLatName',  width: 150 , sortable: true, filter: true },
    {headerName: this.Rtl ? 'عدد الزيارات': 'Number of Visits', field: 'numberofVisits',  width: 180, sortable: true, filter: true  },
    {headerName: this.Rtl ? 'المدده المحدده': 'Period for Visits', field: 'periodforVisits',  width: 150 ,
     sortable: true, filter: true , editable:true ,
     cellEditor: 'select',
     cellEditorParams: { values: this.extractValues(this.carMappings) },
        filterParams: {
          valueFormatter: function(params) {
           return 'Toyota3';
          },
        },
        valueFormatter: function(params) {
         if(params.value==1)
         return 'monthy'
         else
         return 'Quarterly'
        },
        valueParser: function(params) {
          return 'Toyota1';
        }

     ,},
];
public _IPrgPer:IPrgPer;

  constructor( public obCustClassService: CustClassService,private spinner: NgxSpinnerService
    , private modalService: BsModalService, private route: ActivatedRoute, public _GroupPermissionService:GroupPermissionService,) {
  this.defaultColDef = { resizable: true };
  this.frameworkComponents = { genderCellRenderer: GenderCellRenderer };
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
    this.rowData=this.obCustClassService.GetAlldata();
    this.route.data.subscribe(data => {
      this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
       {
         this._IPrgPer=x;
       })
 
     });
 
  }
  insertNewResult() {
    this.agGrid.api.updateRowData({
      add: [this.sports]
    });
   
}
   extractValues(mappings) {
    return Object.keys(mappings);
  }
   lookupValue(mappings, key) {
    return mappings[key];
  }
   lookupKey(mappings, name) {
    for (var key in Object.keys(mappings)) {
      if (mappings[key] === name) {
        return key;
      }
    }
  }
  reset()
  {
    this.obCustClassService.obCustClass=
    {
      
      cclName:null,
      cclLatName: null,
      numberofVisits: 0,
      periodforVisits: 0,
      custClassId:0
     

    }
  }

  onSubmit(f:NgForm)
  {
       this.spinner.show();
    this.isSubmitted=f.invalid;
    if(!this.isSubmitted)
    {
      if(this.obCustClassService.obCustClass.custClassId==null||
        this.obCustClassService.obCustClass.custClassId==0)
        {
this.obCustClassService.postdata().subscribe(res=>{
  this.rowData=this.obCustClassService.GetAlldata();
  this.hide();
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);

}
,err=>{
console.log(err);
setTimeout(() => {

  this.spinner.hide();
}, 2000);
} )
}
else{
  this.obCustClassService.putdata().subscribe(res=>{
    this.rowData=this.obCustClassService.GetAlldata();
    this.hide();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  
  }
  ,err=>{
  console.log(err);
  setTimeout(() => {
  
    this.spinner.hide();
  }, 2000);
  } )
}
    }
setTimeout(() => {

  this.spinner.hide();
}, 2000)
  }
  onChangeSelection(selected) {
   this. obCustClassService.obCustClass.periodforVisits = parseInt(selected);
}
deleteSelectedRows() {
  let alertRow  = this.gridApi.getSelectedRows();
  this.agGrid.api.updateRowData({remove:[alertRow[0]]});
  this.reset();
}
onSelectionChanged(params) {
 
  var selectedRows = this.gridApi.getSelectedRows();
  if(selectedRows!=null&& selectedRows.length===1)
  {
  this.obCustClassService.obCustClass=selectedRows[0]
  console.log( this.obCustClassService.obCustClass);
  }
}
onGridReady(params) {
  this.gridApi = params.api;
  this.rowData=this.obCustClassService.GetAlldata();
}
Delete(index:number)
{
  if(confirm("Are you sure to delete")) {
    {
this.obCustClassService.Deleteclass(index).subscribe((data)=>
{
  
  this.rowData=this.obCustClassService.GetAlldata();
  this.hide();
    }

);
}
  }
}
hide()
{
  this. modalRef.hide();
}
Addnewrecord(template: TemplateRef<any>)
{
  this.reset();
  this.title = 'Add new Record';
  this.modalRef = this.modalService.show(template);
}
UpdateRecord(template: TemplateRef<any>)
{
  const selectedRows = this.gridApi.getSelectedRows();
  if (selectedRows != null && selectedRows.length === 1)
  {
  this.obCustClassService.obCustClass = selectedRows [0];
  this.title = 'Edit Record ' ;//+ this.obCustClassService.obCustClass.cclLatName;
  this.modalRef = this.modalService.show(template);
  }
  else
  {
    alert('Must select Record to edit');
  }
}
}



