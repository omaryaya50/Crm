import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { opendir } from 'fs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { CustomerService } from 'src/app/api.service/customer/customer-service';
import { GroupPermissionService } from 'src/app/api.service/security/group-permission.service';
import { ISalesRep } from 'src/app/Interfaces/codes-Interfaces/isales-rep';
import { Iselect } from 'src/app/Interfaces/Iselect';
import { IPrgPer } from 'src/app/Interfaces/security/IPrgper';
import { GenderCellRenderer } from '../Codes/customerkind/GenderCellRenderer ';
@Component({
  selector: 'app-change-rep',
  templateUrl: './change-rep.component.html',
  styleUrls: ['./change-rep.component.css']
})
export class ChangeRepComponent implements OnInit {
  salesRep: any[] = [];
  AllSales: any[] = [];
  AllSalesfilter: any[] = [];
  Analysisfileselect:  ISalesRep[] = [];
  modalRef: BsModalRef;
  DocumentTypesForDropDown: any[];
  tempSales: any;
 public newsalesRepId=0;
 public RepId=0;
 private editingRowIndex;
 private gridApidisplay;
 @ViewChild('template') template: TemplateRef<any>;
 private gridApiOption;
 public  oldsalesRepId=0;
 public frameworkComponents;
 rowData: any;
 gridColumnApi: any;
 rowSelection = 'single';
 @ViewChild('agGrid') agGrid: AgGridAngular;
 columnDefs: any;
 public _IPrgPer:IPrgPer;

  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  constructor(public SerSalesRep: SalesRepService, private spinner: NgxSpinnerService,    private route: ActivatedRoute,

    public obserCustomer: CustomerService, private modalService: BsModalService,    public _GroupPermissionService:GroupPermissionService,
    ) { 
      this.frameworkComponents = { genderCellRenderer: GenderCellRenderer ,};
      this.DocumentTypesForDropDown = this.AllSales.map(x => x.salesRepLatName);
  this. Setgrid();
    this.SerSalesRep.GetAlldata().subscribe(
      or => {
     
        this.salesRep = or;
        const op = or;
        for (const i in op) {
          this.Analysisfileselect.push({
            salesRepId:  op[i].salesRepId,
            salesRepName: op[i].salesRepName
          });
        }
        
      }
    );
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
  }
  onChangeSelectionSaleRepOld(selected) {
    this.spinner.show();
    this.AllSales=null;
    this.SerSalesRep.getone(this.oldsalesRepId).subscribe(res=>{
      this.SerSalesRep.GetSalesByoldsales
      (res.salesRepId,res.territoryId
       ).subscribe(res1=>{
        this.AllSales=res1;
        try
        {
          this.newsalesRepId=0;
        }
        catch{
          this.newsalesRepId=0;
        }
        this.rowData=null;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
     
       });
    });
 
   

   
  }
  onChangeSelectionCustomerBySalesID(selected) {
   
    this.onShow();
 
  }
  hide()
  {
    this.modalRef.hide();
  }
  onChangeRepId(selected)
  {

  }
  onSubmit(f: NgForm) {
    this.spinner.show();
  }
  onSubmit2(f: NgForm) {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      selectedRows[0].salesRepId=this.RepId;
      this.agGrid.api.updateRowData({
        update: [selectedRows[0]]
      });
    }
 
    this.modalRef.hide();
  }
  onGridReady(params) {
    this.gridApidisplay = params.api;
   this.rowData = this.obserCustomer.getCustomersBySalesRep(-90);
  
  }
  selectFormatter(params) {
    const re=parseInt(params.value);
    const x = this.Analysisfileselect.filter(x1 => x1.salesRepId ===re);


if(x!=null&&x.length>0)
    return x[0].salesRepName;
    else
    return '';
  
  }
  extractValues(mappings) {

    return Object.keys(mappings);
  }
  onrowDoubleClicked(params) {

    this.UpdateRecord(this.template);
    

  }
  UpdateRecord(template: TemplateRef<any>) {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.SerSalesRep.GetSalesByFullPlace(selectedRows[0].governorateId,
        selectedRows[0].territoryId,selectedRows[0].sectorId,selectedRows[0].regionId
        ).subscribe(
          xr=>
          {
           this.AllSalesfilter=xr.filter(x1 => x1.salesRepId !=this.oldsalesRepId);
           
          }
        );
      
      this.modalRef = this.modalService.show(template);
    }
  }
  Setgrid() {
    this.columnDefs = [
  {
      headerName: this.Rtl ? 'المندوب الجديد':'sales Name', field: 'salesRepId', 
      hide: false, editable: false,  width: 200,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
         values: this.extractValues(this.Analysisfileselect)
         },
      valueFormatter: this.selectFormatter.bind(this),
      refData: this.Analysisfileselect
      ,
    }
  ,
      {
        headerName: this.Rtl ? 'كود العميل' : 'Customer Id', field: 'customerId', width: 150,
        sortable: true, filter: true
      },
      // tslint:disable-next-line: max-line-length
      {
        headerName: this.Rtl ? 'الوصف العربى' : 'Customer Name', field: 'customerName',
        width: 300, sortable: true, filter: true
      },
     
      {
        headerName: this.Rtl ? ' المحافظه' : 'Governorate Name', field: 'governorateName',
        width: 300, sortable: true, filter: true
      },
      {
        headerName: this.Rtl ? 'القطاع ' : 'Territory Name', field: 'territoryName',
        width: 300, sortable: true, filter: true
      }
      ,
      {
        headerName: this.Rtl ? 'الاقليم ' : 'sector Name', field: 'sectorName',
        width: 300, sortable: true, filter: true
      }
      ,
      {
        headerName: this.Rtl ? 'المركز ' : 'region Name', field: 'regionName',
        width: 300, sortable: true, filter: true
      }
    ];





  }
  onUpdate()
  {
    if (confirm('سيتم تغير المندوب هل تريد الاستمرار'))
    {
    this.spinner.show();
    const items = [];
    // tslint:disable-next-line: only-arrow-functions
    this.gridApidisplay.forEachNodeAfterFilter(function (node) {
      node.data.salesRepId=parseInt(node.data.salesRepId);
      items.push(node.data);
    });
  console.log(items);
    this.obserCustomer.UpdateSalesRep(items).subscribe(x=>{
      this.spinner.show();
      alert( 'تم تحديث البيانات بنجاح');
      this.rowData=null;
      this.newsalesRepId=0;
     
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }) ;
  
  }
  }
  onShow()
  {
    if(this.oldsalesRepId)
    {
      if(this.newsalesRepId==0)
        {
alert('يجب اختيار مندوب جديد');
return;
        }
      this.spinner.show();
    this.rowData = this.obserCustomer.getCustomersBySalesRep2(this.oldsalesRepId,this.newsalesRepId);
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    }
  }
}
