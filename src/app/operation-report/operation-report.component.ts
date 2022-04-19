import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustClassService } from '../api.service/codes-service/CustClass.service';
import { GovernorateService } from '../api.service/codes-service/governorate-service.service';
import { RegionService } from '../api.service/codes-service/region-service.service';
import { SalesRepService } from '../api.service/codes-service/sales-rep.service';
import { SectorService } from '../api.service/codes-service/Sector.service';
import { TerritoryService } from '../api.service/codes-service/territory.service';
import { CustomerService } from '../api.service/customer/customer-service';

@Component({
  selector: 'app-operation-report',
  templateUrl: './operation-report.component.html',
  styleUrls: ['./operation-report.component.css']
})
export class OperationReportComponent implements OnInit {
  CustomerID: any = 0;
  AllCustomers: any;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  SalesID: any = 0;
  AllSales: any;
  Tid: any = 0;
  Territory: any;
  Sid: any = 0;
  Sector: any;
  //ff
  CustClass: any;
  CustID: any = 0;
  CustomerClassViewList: any;
  CustomerClassViewListCopy: any;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  private gridApidisplay;
  LoginedUserIDCustomer: any;
  LoginedGroupIDCustomer: any;
  LoginedSalesRepID: number;

  FilteredList: any[] = [];
  Total: any;

  Gid: any = 0;
  Rid: any = 0;

  rowSelection:'single';
  Governorate: any;
  Region: any;
  columnDefs:any;
  rowData:any;
  constructor(public obserCustomer: CustomerService,public RegionServ: RegionService,
    public SerSalesRep: SalesRepService,public GovernorateServ: GovernorateService,
     public TerritoryServ: TerritoryService,public SectorServ: SectorService,
      public CustClassServ: CustClassService, private spinner: NgxSpinnerService) {
        this.Setgrid()
        this.obserCustomer.objfiltercust={
          CustomerID:0,
          Gid:0,
          Rid:0,
          SalesID:0,
          Sid:0,
          Tid:0
        }
        this.obserCustomer.ICustomerFilter={
          customerID:0,
          gid:0,
          rid:0,
          salesID:0,
          sid:0,
          tid:0,
        }
        this.obserCustomer.GetAlldata().subscribe(res => {
          this.AllCustomers = res;
        });
        this.SerSalesRep.GetAlldata().subscribe(res => {
          this.AllSales = res;
        });
        this.TerritoryServ.GetAlldata().subscribe(res => {
          this.Territory = res;
        });

        this.CustClassServ.GetAlldata().subscribe(res => {
          this.CustClass = res;
        });
      }

  ngOnInit(): void {
  }
  reset(){
    this.obserCustomer.ICustomerFilter={
      customerID:0,
      gid:0,
      rid:0,
      salesID:0,
      sid:0,
      tid:0,
    }
  }
  async  Filter() {


    this.FilteredList = [];
    if (this.CustID != 0) {
      this.CustomerClassViewList.forEach(element => {
        if (element.customerClassID == this.CustID) {
          this.FilteredList.push(element);
        }

      });
    }
    if (this.Gid != 0) {
      if (this.CustID != 0) {
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
      if (this.CustID != 0 || this.Gid != 0) {
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

    if (this.CustID == 0 && this.Tid == 0 && this.Sid == 0 && this.Rid == 0 && this.Gid == 0) {
      this.FilteredList = this.CustomerClassViewList;
    }


  }
  onChangeSelectionByCustomer(selected) {
    this.CustomerID = parseInt(selected);
  }
  onChangeSelectionCustomerBySalesID(selected) {
    this.SalesID = parseInt(selected);
  }
  onChangeSelectionT(selected) {
    this.Tid=0
    this.Tid = parseInt(selected);
    /* if (this.LoginedGroupIDCustomer != 1) {

      this.GovernorateServ.getBySalesS(this.LoginedSalesRepID, this.Sid)
        .subscribe(xc => {
          this.Governorate = xc;

        });
        this.SectorServ.getone(this.Tid).subscribe(res => {
          this.Sector = res;
        });
    } */
    // else {
      /* this.GovernorateServ.GetAlldata().subscribe(res => {
        this.Governorate = res; */
    //  });
      this.SectorServ.getone(this.Tid).subscribe(res => {
        this.Sector = res;
      });
    //}
 }
 onGridReady(params) {
  this.gridApidisplay = params.api;
  this.rowData = this.obserCustomer.getone(0);

}
 onChangeSelectionS(selected) {
  this.Sid=0
  this.Sid = parseInt(selected);


    this.GovernorateServ.getone(this.Sid).subscribe(res => {
      this.Governorate = res;
    });

}
onChangeSelectionG(selected) {
  this.Gid=0
  this.Gid = parseInt(selected);



    this.RegionServ.getone(this.Gid).subscribe(res => {
      this.Region = res;
    });
}
onChangeSelectionR(selected) {
  this.Rid = parseInt(selected);

}
showData(){
  if(typeof this.obserCustomer.ICustomerFilter.gid != "number")
  {
    this.obserCustomer.ICustomerFilter.gid = Number.parseInt(this.obserCustomer.ICustomerFilter.gid);
  }
  if(typeof this.obserCustomer.ICustomerFilter.tid != "number")
  {
    this.obserCustomer.ICustomerFilter.tid = Number.parseInt(this.obserCustomer.ICustomerFilter.tid);
  } if(typeof this.obserCustomer.ICustomerFilter.sid != "number")
  {
    this.obserCustomer.ICustomerFilter.sid = Number.parseInt(this.obserCustomer.ICustomerFilter.sid);
  } if(typeof this.obserCustomer.ICustomerFilter.rid != "number")
  {
    this.obserCustomer.ICustomerFilter.rid = Number.parseInt(this.obserCustomer.ICustomerFilter.rid);
  }


  console.log(this.obserCustomer.ICustomerFilter)
  this.obserCustomer.GetProductView(this.obserCustomer.ICustomerFilter).subscribe(x=>{
    console.log(x)
    this.rowData=x
  })
    this.reset()
}
Setgrid() {
  this.columnDefs = [
    {
      headerName: this.Rtl ? 'عدد العملاء المسجلين' : 'Customer Number In', field: 'allcustNo', width: 150,
      sortable: true, filter: true
    },
    // tslint:disable-next-line: max-line-length
    {
      headerName: this.Rtl ? 'المحافظه' : 'Government', field: 'gname',
      width: 300, sortable: true, filter: true
    },
    // tslint:disable-next-line: max-line-length
    {
      headerName: this.Rtl ? ' نسبة التشغيل' : 'Operatin Percentage', field: 'percst',
      width: 300, sortable: true, filter: true
    },
    {
      headerName: this.Rtl ? ' عدد العملاء العاملين' : 'Customer Number Working', field: 'rcustNo',
      width: 300, sortable: true, filter: true
    },

  ];





}
}
