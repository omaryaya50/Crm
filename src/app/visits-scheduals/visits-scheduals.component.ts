import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { CustomerService } from '../api.service/customer/customer-service';
import { VisitSchedualsServ } from '../api.service/VisitSchedualsServ';
import { CheckBoxCancel1Component } from '../check-box-cancel1/check-box-cancel1.component';
import { CheckBoxCancel2Component } from '../check-box-cancel2/check-box-cancel2.component';
import { CheckBoxCancel3Component } from '../check-box-cancel3/check-box-cancel3.component';
import { CheckBoxCancel4Component } from '../check-box-cancel4/check-box-cancel4.component';
import { CheckBoxCancel5Component } from '../check-box-cancel5/check-box-cancel5.component';
import { CheckBoxDoneComponent } from '../check-box-done/check-box-done.component';
import { CheckBoxDone2Component } from '../check-box-done2/check-box-done2.component';
import { CheckBoxDone3Component } from '../check-box-done3/check-box-done3.component';
import { CheckBoxDone4Component } from '../check-box-done4/check-box-done4.component';
import { CheckBoxDone5Component } from '../check-box-done5/check-box-done5.component';
import { Iselectitems } from '../Interfaces/customer/Itemselect';
import { VisitCustomerCodeComponent } from '../visit-customer-code/visit-customer-code.component';

@Component({
  selector: 'app-visits-scheduals',
  templateUrl: './visits-scheduals.component.html',
  styleUrls: ['./visits-scheduals.component.css']
})
export class VisitsSchedualsComponent implements OnInit {
  customer: import("e:/AlAml/src/app/Interfaces/customer/Icustomer").Icustomer[];
  AllSales: any;
  bdaymonth:0
  private gridApi2;
  private gridApi;
rowdata:any;

  rowSelection='single'
  SalesID=0;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  month: string;
  rowData2:any;
  rowData:any;

  columnDefs2:any
  columnDefs:any

  colorsNames = []
  Itemsselect: Iselectitems[]=[];
  enterymode=0

  defaultColDef: { resizable: boolean; };



  constructor(public SerSalesRep: SalesRepService ,public VisitSchedualServ:VisitSchedualsServ,public obserCust:CustomerService) {
   this.reset();
    this.SerSalesRep.GetAlldata().subscribe(res => {
      this.AllSales = res;


    });

    this.defaultColDef = { resizable: true };
   this. columnDefs2 =[
    { headerName: 'serial', field: 'serial', width: 200, sortable: true, filter: true ,hide:true},
      { headerName: 'التاريخ', field: 'date', width: 200, sortable: true, filter: true,valueFormatter: function (params) {
        return moment(params.value).format('DD / MM / YYYY') }},
      { headerName:  'العميل ', field: 'visitCustomerCode1', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,
      cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames },
      // valueFormatter: this.selectFormatter.bind(this)




  },
      { headerName: 'تمت الزياره', field: 'done1', width: 150, sortable: true, filter: true ,cellRendererFramework: CheckBoxDoneComponent },
      { headerName: 'الغاء الزياره', field: 'cancel1', width: 150, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component ,editable:false},
      { headerName:  'العميل 1', field: 'visitCustomerCode2', width: 200, sortable: true,cellRendererFramework: VisitCustomerCodeComponent, filter: true,cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames }, },
      { headerName: 'تمت الزياره', field: 'doneYN2', width: 150, sortable: true, filter: true,cellRendererFramework: CheckBoxDone2Component },
      { headerName: 'الغاء الزياره', field: 'cancel2', width: 150, sortable: true, filter: true  ,cellRendererFramework: CheckBoxCancel2Component},
      { headerName:  'العميل 2', field: 'visitCustomerCode3', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames }, },
      { headerName: 'تمت الزياره', field: 'doneYN3', width: 150, sortable: true, filter: true,cellRendererFramework: CheckBoxDone3Component },
      { headerName: 'الغاء الزياره', field: 'cancel3', width: 150, sortable: true, filter: true  ,cellRendererFramework: CheckBoxCancel3Component },
      { headerName:  'العميل 3', field: 'visitCustomerCode4', width: 200, sortable: true, filter: true,cellRendererFramework: VisitCustomerCodeComponent,cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames }, },
      { headerName: 'تمت الزياره', field: 'doneYN4', width: 150, sortable: true, filter: true,cellRendererFramework: CheckBoxDone4Component },
      { headerName: 'الغاء الزياره', field: 'cancel4', width: 150, sortable: true, filter: true, cellRendererFramework:CheckBoxCancel4Component },
      { headerName:  'العميل 4', field: 'visitCustomerCode5', width: 200, sortable: true, filter: true,cellRendererFramework: VisitCustomerCodeComponent,cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames }, },
      { headerName: 'doneYN5', field: 'doneYN5', width: 150, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component },
      { headerName: 'cancel5', field: 'cancel5', width: 150, sortable: true, filter: true, cellRendererFramework: CheckBoxCancel5Component },
      { headerName:  'العميل 5', field: 'visitCustomerCode6', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,hide:true},
      { headerName:  'العميل 6', field: 'visitCustomerCode7', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,hide:true},
      { headerName:  'العميل 7', field: 'visitCustomerCode8', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,hide:true},
      { headerName:  'العميل 8', field: 'visitCustomerCode14', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,hide:true},
      { headerName:  'العميل 8', field: 'visitCustomerCode9', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,hide:true},
      { headerName:  'العميل 10', field: 'visitCustomerCode10', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,hide:true},
      { headerName:  'العميل 1', field: 'visitCustomerCode11', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,hide:true},
      { headerName:  'العميل 1', field: 'visitCustomerCode12', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,hide:true},
      { headerName:  'العميل 1', field: 'visitCustomerCode13', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,hide:true},
      { headerName: 'doneYN5', field: 'doneYN6', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component,hide:true },
      { headerName: 'doneYN5', field: 'doneYN7', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component,hide:true },
      { headerName: 'doneYN5', field: 'doneYN8', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component,hide:true },
      { headerName: 'doneYN5', field: 'doneYN9', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component,hide:true },
      { headerName: 'doneYN5', field: 'doneYN10', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component,hide:true },
      { headerName: 'doneYN5', field: 'doneYN11', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component,hide:true },
      { headerName: 'doneYN5', field: 'doneYN12', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component,hide:true },
      { headerName: 'doneYN5', field: 'doneYN13', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component,hide:true },
      { headerName: 'doneYN5', field: 'doneYN14', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component,hide:true },
      { headerName: 'cancel1', field: 'cancel6', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component,hide:true },
      { headerName: 'cancel1', field: 'cancel7', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component,hide:true },
      { headerName: 'cancel1', field: 'cancel8', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component,hide:true },
      { headerName: 'cancel1', field: 'cancel9', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component,hide:true },
      { headerName: 'cancel1', field: 'cancel10', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component,hide:true },
      { headerName: 'cancel1', field: 'cancel11', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component,hide:true },
      { headerName: 'cancel1', field: 'cancel12', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component,hide:true },
      { headerName: 'cancel1', field: 'cancel13', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component,hide:true },
      { headerName: 'cancel1', field: 'cancel14', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component,hide:true },





    ];
    this. columnDefs =[
      { headerName: 'date', field: 'date', width: 200, sortable: true, filter: true,valueFormatter: function (params) {
        return moment(params.value).format('DD / MM / YYYY') }},
      { headerName:  'visitCustomerCode1', field: 'visitCustomerCode1', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,
      cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames },
      // valueFormatter: this.selectFormatter.bind(this)




  },
      { headerName: 'doneYN1', field: 'doneYN1', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxDoneComponent },
      { headerName: 'cancel1', field: 'cancel1', width: 200, sortable: true, filter: true ,cellRendererFramework: CheckBoxCancel1Component },
      { headerName:  'visitCustomerCode2', field: 'visitCustomerCode2', width: 200, sortable: true,cellRendererFramework: VisitCustomerCodeComponent, filter: true,cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames }, },
      { headerName: 'doneYN2', field: 'doneYN2', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone2Component },
      { headerName: 'cancel2', field: 'cancel2', width: 200, sortable: true, filter: true  ,cellRendererFramework: CheckBoxCancel2Component},
      { headerName:  'visitCustomerCode3', field: 'visitCustomerCode3', width: 200, sortable: true, filter: true, cellRendererFramework: VisitCustomerCodeComponent,cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames }, },
      { headerName: 'doneYN3', field: 'doneYN3', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone3Component },
      { headerName: 'cancel3', field: 'cancel3', width: 200, sortable: true, filter: true  ,cellRendererFramework: CheckBoxCancel3Component },
      { headerName:  'visitCustomerCode4', field: 'visitCustomerCode4', width: 200, sortable: true, filter: true,cellRendererFramework: VisitCustomerCodeComponent,cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames }, },
      { headerName: 'doneYN4', field: 'doneYN4', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone4Component },
      { headerName: 'cancel4', field: 'cancel4', width: 200, sortable: true, filter: true, cellRendererFramework:CheckBoxCancel4Component },
      { headerName:  'visitCustomerCode5', field: 'visitCustomerCode5', width: 200, sortable: true, filter: true,cellRendererFramework: VisitCustomerCodeComponent,cellEditor: 'agSelectCellEditor', editable:true,
      cellEditorParams: { values: this.colorsNames }, },
      { headerName: 'doneYN5', field: 'doneYN5', width: 200, sortable: true, filter: true,cellRendererFramework: CheckBoxDone5Component },
      { headerName: 'cancel5', field: 'cancel5', width: 200, sortable: true, filter: true, cellRendererFramework: CheckBoxCancel5Component },
    ];
  this.rowData=  this.VisitSchedualServ.findAll()
  }

  ngOnInit(): void {
  }
  onChangeSelectionCustomerBySalesID($event){
    this.rowData2=[]
    console.log($event)
    this.SalesID=$event
    this.obserCust.getCustomersBySalesRep(this.SalesID).subscribe(x=>{
      console.log(x)
   this.customer=x
   for (const i in this.customer) {
    this.Itemsselect.push({
      custCode: this.customer[i].customerId,
      custName: this.customer[i].customerName
    });
  }
  console.log(this.Itemsselect)

   this.customer.forEach(color=> {
    this.colorsNames.push(color.customerName+'-'+color.customerId);
  })

    })
  }
  reset(){
    this.VisitSchedualServ.iVisitScheduals={
      salesRepId:0,
      doneYN5:false,
      date:new Date(),
      datePeriod:'',
      serial:0,
      cancel1:false,
      cancel2:false,
      cancel3:false,
      cancel4:false,
      cancel5:false,
      doneYN1:false,
      doneYN2:false,
      doneYN3:false,
      doneYN4:false,
      visitCustomerCode1:0,
      visitCustomerCode2:0,
      visitCustomerCode3:0,
      visitCustomerCode4:0,
      visitCustomerCode5:0,





    }
  }
  onChangeSelectionMonth($event){
     this.bdaymonth=$event
     this.month=this.bdaymonth.toString()
     console.log(this.month)

  }
  onGridReady2(params) {

    this.gridApi2 = params.api;



  }
  onGridReady(params) {

    this.gridApi = params.api;



  }
  onrowDoubleClicked(params) {
    this.enterymode=1

  }
  extractValues(mappings) {
    return Object.keys(mappings);
  }
  selectFormatter(params) {
console.log(this.Itemsselect)

    const y = this.Itemsselect.filter((x1: { custCode: any; }) => x1.custCode === x1.custCode);
console.log(y)
console.log('y')

    if(y==null||y.length==0)
    return '';
    else
    console.log(y[0].custName)
    return y[0].custName;
  }
  ShowData(){


     this.VisitSchedualServ.findAll2(this.month,this.SalesID).subscribe(x=>{
    this.rowData2=x
  }
    )




    }
    PostRecordArea(){
      this.enterymode=1
      console.log(this.enterymode)
    }
    onsubmit(){
      this.VisitSchedualServ.iVisitSchedualslist=[]
      console.log(this.rowData2);

      for (const i in this.rowData2) {
   //  console.log(   parseInt(this.VisitSchedualServ.iVisitSchedualslist[i].visitCustomerCode1))

        this.VisitSchedualServ.iVisitSchedualslist.push({
          visitCustomerCode1: this.rowData2[i].visitCustomerCode1,
          visitCustomerCode2:this.rowData2[i].visitCustomerCode2,
          visitCustomerCode3:this.rowData2[i].visitCustomerCode3,
          visitCustomerCode4:this.rowData2[i].visitCustomerCode4,
          visitCustomerCode5:this.rowData2[i].visitCustomerCode5,
          visitCustomerCode6:this.rowData2[i].visitCustomerCode6,
          visitCustomerCode7:this.rowData2[i].visitCustomerCode7,
          visitCustomerCode8:this.rowData2[i].visitCustomerCode8,
          visitCustomerCode9:this.rowData2[i].visitCustomerCode9,
          visitCustomerCode10:this.rowData2[i].visitCustomerCode10,
          visitCustomerCode11:this.rowData2[i].visitCustomerCode11,
          visitCustomerCode12:this.rowData2[i].visitCustomerCode12,
          visitCustomerCode13:this.rowData2[i].visitCustomerCode13,
          visitCustomerCode14:this.rowData2[i].visitCustomerCode14,

         doneYN1:this.rowData2[i].doneYN1,
         doneYN2:this.rowData2[i].doneYN2,
         doneYN3:this.rowData2[i].doneYN3,
         doneYN4:this.rowData2[i].doneYN4,
         doneYN5:this.rowData2[i].doneYN5,
         doneYN6:this.rowData2[i].doneYN6,
         doneYN7:this.rowData2[i].doneYN7,
         doneYN8:this.rowData2[i].doneYN8,
         doneYN9:this.rowData2[i].doneYN9,
         doneYN10:this.rowData2[i].doneYN10,
         doneYN11:this.rowData2[i].doneYN11,
         doneYN12:this.rowData2[i].doneYN12,
         doneYN13:this.rowData2[i].doneYN13,
         doneYN14:this.rowData2[i].doneYN14,

         cancel1:this.rowData2[i].cancel1,
         cancel2:this.rowData2[i].cancel2,
         cancel3:this.rowData2[i].cancel3,
         cancel4:this.rowData2[i].cancel4,
         cancel5:this.rowData2[i].cancel5,
         cancel6:this.rowData2[i].cancel6,
         cancel7:this.rowData2[i].cancel7,
         cancel8:this.rowData2[i].cancel8,
         cancel9:this.rowData2[i].cancel9,
         cancel10:this.rowData2[i].cancel10,
         cancel11:this.rowData2[i].cancel1,
         cancel12:this.rowData2[i].cancel2,
         cancel13:this.rowData2[i].cancel3,
         cancel14:this.rowData2[i].cancel4,


         date:this.rowData2[i].date,
         datePeriod:this.VisitSchedualServ.iVisitScheduals.datePeriod,
         salesRepId:parseInt(this.VisitSchedualServ.iVisitScheduals.salesRepId.toString()) ,
        serial :this.rowData2[i].serial



        });

      }

      console.log(this.VisitSchedualServ.iVisitSchedualslist)
      console.log('xxxx')
      this.VisitSchedualServ.Save().subscribe(x=>{
        console.log(x)
        alert('تم الحفظ')
      })

      this.enterymode=0

    }
    CancelSave() {
      this.enterymode = 0;
      this.reset();


    }

}
