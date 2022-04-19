import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from 'src/app/api.service/customer/customer-service';
import { templateJitUrl } from '@angular/compiler';
import { ControlContainer } from '@angular/forms';
import { SalesRepService } from 'src/app/api.service/codes-service/sales-rep.service';
import { CustomersNotification } from 'src/app/Interfaces/customer/customers-notification';
import { WaitingCustomersComponent } from '../WaitingCustomers/waiting-customers/waiting-customers.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [WaitingCustomersComponent],
})
export class NavbarComponent implements OnInit {
  username = '';

  StatusString: string;
  SalesName: string;
  CustomerName: string;
  Empty: boolean = true;
  EmptyString="";

  LoginedGroupIDCustomer: any;
  Admin = false;
  WaitingListLength: any;
  SalesList: any;

  WaitingList: CustomersNotification[]=[];
  WaitingElementString: CustomersNotification ;
  public Rtl = localStorage.getItem('textDir') === 'ltr' ? false : true;

  constructor(private translate: TranslateService, public obserCustomer: CustomerService,
    public SerSalesRep: SalesRepService, private router: Router, private WaitingComponent: WaitingCustomersComponent) {
    if (sessionStorage.getItem('login') != null && sessionStorage.getItem('login') != "") {
      this.username = sessionStorage.getItem('login').toString();
    }
    this.LoginedGroupIDCustomer = sessionStorage.getItem('GroupID');

    console.log(this.Rtl);


  }



  IsAdmin() {
    if (this.LoginedGroupIDCustomer == 1) {
      this.Admin = true;
    }
  }


  ngOnInit(): void {
    this.IsAdmin();
    this.notification();
  }

  resetWaitingElementString() {
    this.WaitingElementString = {
      customerId: 0,
      customerName: "",
      SalesName: "",
      StatusString: ""
    };
  }


  notification() {

   /*  this.obserCustomer.getByStatus(3).subscribe(
      res => {
        this.SerSalesRep.GetAlldata().subscribe(
          tb => {
            this.SalesList = tb;
            res.forEach(reselement => {
              if (reselement.status != -1) {
                if (reselement.status == 0) {
                  this.StatusString = "Has Been Added By";
                }
                else {
                  this.StatusString = "Has Been Edited By";
                }

                tb.forEach(Saleselement => {
                  if (Saleselement.salesRepId == reselement.salesRepId) {
                    this.SalesName = Saleselement.salesRepName;
                  }
                });
                this.resetWaitingElementString();

                this.WaitingElementString.customerId = reselement.customerId;
                this.WaitingElementString.customerName = reselement.customerName + " ";
                this.WaitingElementString.StatusString = this.StatusString + " ";
                this.WaitingElementString.SalesName = this.SalesName;

                this.WaitingList.push(this.WaitingElementString);
              }
            });

            this.WaitingListLength = this.WaitingList.length;
            if (this.WaitingListLength == 0) {

              this.EmptyString = "No Notification To Show";
              this.WaitingListLength = "";
            }
            else {
              this.Empty = false;
            }
          }
        );

      }
    ); */

  }

  move(id) {
    //this.router.navigateByUrl('/Admin/WaitingCust');
    // this.WaitingComponent.ngOnChanges(id);
  }
  onLoggedout() {
    sessionStorage.removeItem('login');
  }
  changeLang(language: string) {
    this.translate.use(language);
  }
  changlan(lang: string, language: string) {
    localStorage.setItem('textDir', lang);
    localStorage.setItem('Lang', language);
    window.location.reload();
  }


}
