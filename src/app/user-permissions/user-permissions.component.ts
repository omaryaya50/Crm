import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupPermissionService } from '../api.service/security/group-permission.service';
import { ProgramService } from '../api.service/security/program.service';
import { UserService } from '../api.service/security/users-service';
import { AgGridCheckboxComponent } from '../components/ag-grid-checkbox/ag-grid-checkbox.component';
import { AgGridCheckbox2Component } from '../components/ag-grid-checkbox2/ag-grid-checkbox2.component';
import { AgGridCheckbox3Component } from '../components/ag-grid-checkbox3/ag-grid-checkbox3.component';
import { AgGridCheckbox4Component } from '../components/ag-grid-checkbox4/ag-grid-checkbox4.component';
import { IPrgPer } from '../Interfaces/security/IPrgper';
import { IPro } from '../Interfaces/security/IPro';
@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent implements OnInit {

  SupListselect:IPro[]=[]
  columnDefs2:any
  rowData2:any;
  getgroup:any
  rowSelection2:'single';
  public _IPrgPer:IPrgPer;
  private gridApi2;
  UserList:any
x:any
public id=0;
  constructor(

    private router: Router,
    private route: ActivatedRoute,
    public userServ:UserService,
    public _GroupPermissionService:GroupPermissionService,
    public _ProgramService:ProgramService,

    ){
      this.columnDefs2=[
  
        {field: 'arabicName' ,headerName:'الشاشه', sortable: true,width:300,},
        {field: 'read' ,headerName:'قراءه', sortable: true,width:250, cellRendererFramework: AgGridCheckbox4Component },
        {field: 'insert' ,headerName:'اضافه', sortable: true,width:150 ,cellRendererFramework: AgGridCheckboxComponent },
        {field: 'delete' ,headerName:'حذف', sortable: true,width:150, cellRendererFramework: AgGridCheckbox3Component },
        {field: 'edit' ,headerName:'تعديل', sortable: true,width:150, cellRendererFramework: AgGridCheckbox2Component },
        {field: 'excel' ,headerName:'excel', sortable: true,hide:true,width:250, cellRendererFramework: AgGridCheckboxComponent },
        {field: 'print' ,headerName:'print', sortable: true,hide:true,width:250, cellRendererFramework: AgGridCheckboxComponent },
    
        {field: 'recordList' ,headerName:'recordList',hide:true, sortable: true,width:250, cellRendererFramework: AgGridCheckboxComponent },
      ]
      
      
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
    this.route.data.subscribe(data => {
     this. _GroupPermissionService.GetProgpermissionperuser(data.ProgId, localStorage.getItem("id")).subscribe(x=>
      {
        this._IPrgPer=x;
      })

    });
    this.userServ.GetAlldata().subscribe(x=>{
      this.UserList=x
    })
  }

  Reset()
  {
    this._ProgramService.GroupProgram={
      arabicName:null,
      delete:null,
      edit:null,
      excel:null,
      groupCode:0,
      insert:null,
      latinName:null,
      print:null,
      progId:0,
      read:null,
      recordList:null,
      sysId:0,
      userId:0,
      parentId:0,
    }
  }
  onGridReady2(params){
    this.gridApi2 = params.api;
  }
  JopGroupChanged(){
    if(this.id>0){
      console.log(this._GroupPermissionService.showGroupPermission2(this.id))
  this._GroupPermissionService.showGroupPermission2(this.id).subscribe(x=>{
    console.log(x)

    this.rowData2=x
    })
    
    }
    else{
      this.rowData2=null;
    }
  }
  extractValues(mappings) {
    return Object.keys(mappings);
  }
  selectFormatter2(params) {

    
    const y = this.SupListselect.filter((x1: { parentId: any; }) => x1.parentId === params.value);
    if(y==null||y.length==0)
    return '';
    else
    return y[0].arabicName;
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
        groupCode:0,
        insert:items6[i].insert,
        parentId:items6[i].parentId,
        print:items6[i].print,
        progId:items6[i].progId,
        read:items6[i].read,
        recordList:items6[i].recordList,
        sysId:207,
        latinName:items6[i].latinName,
        userId:parseInt( this.id.toString())
      });
    }
    
    }
    console.log(this._ProgramService.GroupProgramList);
    this._GroupPermissionService.SaveGroupPermission2(this._ProgramService.GroupProgramList).subscribe(x=>{
      alert('تم الحفظ')
      
    })
 
}
}
