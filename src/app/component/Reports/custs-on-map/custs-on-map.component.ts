import { AgmMap,  LatLngBounds } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Console } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustClassService } from 'src/app/api.service/codes-service/CustClass.service';
import { GovernorateService } from 'src/app/api.service/codes-service/governorate-service.service';
import { RegionService } from 'src/app/api.service/codes-service/region-service.service';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { SectorService } from 'src/app/api.service/codes-service/Sector.service';
import { TerritoryService } from 'src/app/api.service/codes-service/territory.service';
import { CustomerService } from 'src/app/api.service/customer/customer-service';

@Component({
  selector: 'app-custs-on-map',
  templateUrl: './custs-on-map.component.html',
  styleUrls: ['./custs-on-map.component.css']
})
export class CustsOnMapComponent implements OnInit {
  CustomerView: any;
  latitude: number=30.05917;
  mapZoom=10;
public  noofcusts=0;
  longitude: number=31.18445;
  CustomerID: any = 0;
  AllCustomers: any;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;
  SalesID: any = 0;
  AllSales: any;
  Tid: any = 0;
  Territory: any;
  Sid: any = 0;
  Sector: any;
  icon = {
    url: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png',
    scaledSize: {
      width: 40,
      height: 60
  }
  
}
  //ff
  CustClass: any;
  CustID: any = 0;
  CustomerClassViewList: any;
  CustomerClassViewListCopy: any;
 public lat: number = 51.673858;
 public lng: number = 7.815982;
  LoginedUserIDCustomer: any;
  LoginedGroupIDCustomer: any;
  LoginedSalesRepID: number;

  FilteredList: any[] = [];
  Total: any;

  Gid: any = 0;
  Rid: any = 0;


  Governorate: any;
  Region: any;
  @ViewChild('gm') gm: AgmMap;
  private gridApidisplay;
  rowData: any;
  columnDefs: any;
  rowSelection = 'single';
  show: boolean;
  Tname: any;
  Sname: any;
  Gname: any;
  Rname: any;
  constructor(public obserCustomer: CustomerService,public RegionServ: RegionService, 
    public SerSalesRep: SalesRepService,public GovernorateServ: GovernorateService,
     public TerritoryServ: TerritoryService,public SectorServ: SectorService,
      public CustClassServ: CustClassService, private spinner: NgxSpinnerService) {
    this.LoginedGroupIDCustomer = sessionStorage.getItem('GroupID');
    this.LoginedUserIDCustomer = sessionStorage.getItem('ID');
 
    
   

    if (this.LoginedGroupIDCustomer == 1) {
 /*      this.obserCustomer.GetAlldata().subscribe(res => {
        this.AllCustomers = res;
      }); */
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
    else {


      this.SerSalesRep.GetByUserID(this.LoginedUserIDCustomer).subscribe(res => {
        this.LoginedSalesRepID = res;

        this.TerritoryServ.getBySales(this.LoginedSalesRepID).subscribe(orders => {
          this.Territory = orders;
        });

      });
    }

    this.obserCustomer.objfiltercust={
      CustomerID:0,
      Gid:0,
      Rid:0, 
      SalesID:0,
      Sid:0,
      Tid:0 
    }
    }


  
    onChangeSelectionCustomerClass(selected) {
      this.CustID = parseInt(selected);
  
    }
  
  
    onChangeSelectionCustomerBySalesID(selected) {
      this.SalesID = parseInt(selected);
    }
    onChangeSelectionT(selected) {
      this.Tid = parseInt(selected);
      if( this.Tid>0)
      this.Tname = this.Territory.find((x: any) => x.territoryId ==  this.Tid).territoryName; 
      else
      this.Tname = '';
      if (this.LoginedGroupIDCustomer != 1) {
  
   
            this.Governorate = null;
  
   
          this.SectorServ.getone(this.Tid).subscribe(res => {
            this.Sector = res;
          });
      }
      else {
      
          this.Governorate = null;
       
        this.SectorServ.getone(this.Tid).subscribe(res => {
          this.Sector = res;
        });
      }
   }

  ngOnInit(): void {
  
    

  }
  onChangeSelectionS(selected) {
    this.Sid = parseInt(selected);
if(this.Sid>0)
    this.Sname = this.Sector.find((x: any) => x.territoryId ==  this.Tid&&x.sectorId==this.Sid).sectorName; 
    else
    this.Sname = '';

    this.Governorate =[];
    if (this.LoginedGroupIDCustomer != 1) {
      this.GovernorateServ.getBySalesS(this.LoginedSalesRepID, this.Sid)
        .subscribe(xc => {
          this.Governorate = xc;

        });
    }
    else {
    /*   this.GovernorateServ.GetAlldata().subscribe(res => {
        this.Governorate = res;
      }); */

      this.GovernorateServ.FindByTerritoryandse(
      this.Tid,
        this.Sid
      ).subscribe(orders => {
        this.Governorate = orders;
      });
    }
  }
  onChangeSelectionG(selected) {
    this.Gid = parseInt(selected);
    if(this.Gid>0)
    this.Gname = this.Governorate.find((x: any) => x.territoryId ==  this.Tid&&x.sectorId==this.Sid
    &&x.governorateId==this.Gid ).governorateName; 
    else
    this.Gname = '';

    if (this.LoginedGroupIDCustomer != 1) {
      this.RegionServ.getBySalesG(this.LoginedSalesRepID, this.Gid)
        .subscribe(xc => { this.Region = xc; });
    }
    else {
      this.RegionServ.getone(this.Gid).subscribe(res => {
        this.Region = res;
      });
    }
  }
  onChangeSelectionR(selected) {
    this.Rid = parseInt(selected);
    if(this.Rid>0)
    this.Rname = this.Region.find((x: any) => x.regionId==this.Rid
    &&x.governorateId==this.Gid ).regionName; 
    else
    this.Rname = '';
  }
  onSelectionChanged(params) {
    const selectedRows = this.gridApidisplay.getSelectedRows();
    if (selectedRows != null && selectedRows.length === 1) {
      this.obserCustomer.obIcustomer = selectedRows[0];
    }




}
async showdata(){
  this.spinner.show();
this.obserCustomer.objfiltercust.CustomerID=this.CustomerID;
this.obserCustomer.objfiltercust.SalesID=this.SalesID;
this.obserCustomer.objfiltercust.Tid=this.Tid;
this.obserCustomer.objfiltercust.Gid=this.Gid;
this.obserCustomer.objfiltercust.Rid=this.Rid;
this.obserCustomer.objfiltercust.Sid=this.Sid;
 this.obserCustomer.FindByMap(this.obserCustomer.objfiltercust).subscribe(res=>{
  var xvv=res;
  this.latitude=xvv[0].xCoordinte;
  this.longitude=xvv[0].yCoordinte; 
  this.obserCustomer.CustomerListMap=xvv;
  if( this.obserCustomer.CustomerListMap!=null&& this.obserCustomer.CustomerListMap.length>0)
  this.noofcusts= this.obserCustomer.CustomerListMap.length;
  else
  this.noofcusts=0;

   
 });
  
  setTimeout(() => {
    this.spinner.hide();
  }, 4000);

}


clickedMarker(label: number, index: number) {
  this.latitude=label;
  this.longitude=index;
  // this is not working--> this.mapZoom=14;
  //But this is working(interesting !)
  if( this.noofcusts<30)
  this.mapZoom= this.mapZoom+5;
  else
  this.mapZoom= this.mapZoom+3;
}
mapClicked($event: MouseEvent) {

}
centerChange(ev) {
 // alert('ok');
/*   var me = this;
  console.log("centre change called");
  me.gMaps.setCenter({ lat:ev.lat,lng:ev.lng}); */
}
public mapReady(map) {

/*   try
  {
    this.latitude=this.obserCustomer.CustomerListMap[0].xCoordinte;
    this.longitude=this.obserCustomer.CustomerListMap[0].yCoordinte;
  }
  catch{
  }
   
  var bonds=new google.maps.LatLngBounds();
  bonds.extend(new google.maps.LatLng(this.obserCustomer.CustomerListMap[0].xCoordinte, 
    this.obserCustomer.CustomerListMap[0].yCoordinte));
  map.fitBounds(bonds);
  map.panTo(this.obserCustomer.CustomerListMap[0].xCoordinte, 
    this.obserCustomer.CustomerListMap[0].yCoordinte) */
  }
  onMouseOver(infoWindow, gm) {

 this.show=true;
}
}
