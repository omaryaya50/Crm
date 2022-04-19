import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupPermissionService } from '../api.service/security/group-permission.service';
import { GroupService } from '../api.service/security/group-service';
import { ProgramService } from '../api.service/security/program.service';
import { AgGridCheckboxComponent } from '../components/ag-grid-checkbox/ag-grid-checkbox.component';
import { AgGridCheckbox2Component } from '../components/ag-grid-checkbox2/ag-grid-checkbox2.component';
import { AgGridCheckbox3Component } from '../components/ag-grid-checkbox3/ag-grid-checkbox3.component';
import { AgGridCheckbox4Component } from '../components/ag-grid-checkbox4/ag-grid-checkbox4.component';
import { IPrgPer } from '../Interfaces/security/IPrgper';

@Component({
  selector: 'app-group-permissions',
  templateUrl: './group-permissions.component.html',
  styleUrls: ['./group-permissions.component.css']
})
export class GroupPermissionsComponent implements OnInit {
  public _IPrgPer:IPrgPer;

   rowData2:any;
  getgroup:any
  rowSelection2:'single';
  private gridApi2;
  columnDefs2=[
    {field: 'parentId' ,headerName:'parentId', sortable: true,width:300,hide:true},
    {field: 'progId' ,headerName:'ProgId', sortable: true,width:300,hide:true },
    {field: 'arabicName' ,headerName:'الشاشه', sortable: true,width:300,},
    {field: 'arabicName' ,headerName:'ArabicName', sortable: true,width:200,hide:true},
    {field: 'read' ,headerName:'قراءه', sortable: true,width:250, cellRendererFramework: AgGridCheckbox4Component },
    {field: 'insert' ,headerName:'اضافه', sortable: true,width:150 ,cellRendererFramework: AgGridCheckboxComponent },
    {field: 'delete' ,headerName:'حذف', sortable: true,width:150, cellRendererFramework: AgGridCheckbox3Component },
    {field: 'edit' ,headerName:'تعديل', sortable: true,width:150, cellRendererFramework: AgGridCheckbox2Component },
    {field: 'excel' ,headerName:'excel', sortable: true,hide:true,width:250, cellRendererFramework: AgGridCheckboxComponent },
    {field: 'print' ,headerName:'print', sortable: true,hide:true,width:250, cellRendererFramework: AgGridCheckboxComponent },
 
    {field: 'recordList' ,headerName:'recordList',hide:true, sortable: true,width:250, cellRendererFramework: AgGridCheckboxComponent },
  ]
  GroupList: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _GroupPermissionService:GroupPermissionService,
    public _ProgramService:ProgramService,
    public _GroupServ:GroupService
    ){
      this.Reset();
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
  this._GroupServ.GetAlldata().subscribe(x=>{
    this.GroupList=x
  })
  this.route.data.subscribe(data => {
    console.log(data);
   this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
    {
      this._IPrgPer=x;
    })

  });
  }

  Reset()
  {
    this._ProgramService.GroupProgram={
      arabicName:null,
      delete:null,
      edit:null,
      excel:null,
      groupCode:1,
      insert:null,
      latinName:null,
      print:null,
      progId:0,
      read:null,
      recordList:null,
      sysId:0,
      userId:null,
      parentId:0,
    }
  }
  onGridReady2(params){
    this.gridApi2 = params.api;
  }
  JopGroupChanged(){
 
    if(this._ProgramService.GroupProgram.groupCode>0){
      this.rowData2=this._GroupPermissionService.showGroupPermission(this._ProgramService.GroupProgram.groupCode);

    }
    else{
   
      this.rowData2=null;
    }
   
  }
  save(){
    const items6 = [];
    this.gridApi2.forEachNodeAfterFilter(function(node) {
      items6.push(node.data);
    });
    this._ProgramService.GroupProgramList=[];
    for(let i = 0; i < items6.length; i++) {
      if (typeof items6[i] != "undefined")
      {
       
      this._ProgramService.GroupProgramList.push({
        arabicName:items6[i].arabicName,
        delete:items6[i].delete,
        edit:items6[i].edit,
        excel:items6[i].excel,
        groupCode:items6[i].groupCode,
        insert:items6[i].insert,
        parentId:items6[i].parentId,
        print:items6[i].print,
        progId:items6[i].progId,
        read:items6[i].read,
        recordList:items6[i].recordList,
        sysId:207,
        latinName:items6[i].latinName,
        userId:0
      });
    }
    
    }
    console.log(this._ProgramService.GroupProgramList)
    this._GroupPermissionService.SaveGroupPermission(this._ProgramService.GroupProgramList).subscribe(res=>{
      alert('تم الحفظ');
    })
  }
}

