import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MenuListComponent } from './component/menu-list/menu-list.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { CustomerkindComponent } from './component/Codes/customerkind/customerkind.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SalesFieldComponent } from './component/codes/sales-field/sales-field.component';
import { CompetitionCompanyComponent } from './component/codes/competition-company/competition-company.component';
import { ProductGroupComponent } from './component/codes/product-group/product-group.component';
import { NoteTypeComponent } from './component/codes/note-type/note-type.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TerritoryComponent } from './component/codes/territory/territory.component';
import { GovernorateComponent } from './component/codes/governorate/governorate.component';
import { LoginActivate } from './component/login/LoginActivate';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UsersComponent } from './component/security/users/users.component';
import { CustomerComponent } from './component/customer/customer/customer.component';
import { GroupsComponent } from './component/security/groups/groups.component';
import { SalesRepComponent } from './component/codes/Sales-Rep/sales-rep/sales-rep.component';
import { AgmCoreModule } from '@agm/core';
import { LocationComponent } from './location/location.component';
import { GeneralSetUpComponent } from './component/general-set-up/general-set-up.component';
import { WaitingCustomersComponent } from './component/WaitingCustomers/waiting-customers/waiting-customers.component';
import { AgentComponent } from './component/codes/Agent/agent/agent.component';
import { CreateQuestionComponent } from './component/codes/create-question/create-question.component';
import { CustRepComponent } from './component/Reports/CustRep/cust-rep/cust-rep.component';
import { CustClassRepComponent } from './component/Reports/CustomerClassREp/cust-class-rep/cust-class-rep.component';
import { CustSalesFieldRepComponent } from './component/Reports/CustomerSalesFieldRep/cust-sales-field-rep/cust-sales-field-rep.component';
import { CustNoteTypeRepComponent } from './component/Reports/CustomerNoteTypeReport/cust-note-type-rep/cust-note-type-rep.component';
import { CustProcuctGRepComponent } from './component/Reports/CustomerProductGroupREp/cust-procuct-grep/cust-procuct-grep.component';
import { TotalVisitsRepComponent } from './component/Reports/TotalVisits/total-visits-rep/total-visits-rep.component';
import { EvalRepComponent } from './component/Reports/EvaluationRep/eval-rep/eval-rep.component';
import { ComptionComponent } from './Component/Reports/compition/comption/comption.component';
import { UpdatedCustomersComponent } from './component/Reports/updated-customers/updated-customers.component';
import { DistributorComponent } from './component/codes/distributor/distributor.component';
import { FilterCustComponent } from './filter-cust/filter-cust.component';
import { ChangeRepComponent } from './component/change-rep/change-rep.component';
import { CustsOnMapComponent } from './component/Reports/custs-on-map/custs-on-map.component';
import { SalesonMapComponent } from './component/Reports/saleson-map/saleson-map.component';
import { AgGridCheckboxComponent } from './components/ag-grid-checkbox/ag-grid-checkbox.component';
import { AgGridCheckbox2Component } from './components/ag-grid-checkbox2/ag-grid-checkbox2.component';
import { AgGridCheckbox3Component } from './components/ag-grid-checkbox3/ag-grid-checkbox3.component';
import { AgGridCheckbox4Component } from './components/ag-grid-checkbox4/ag-grid-checkbox4.component';
import { GroupPermissionsComponent } from './group-permissions/group-permissions.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { OperationReportComponent } from './operation-report/operation-report.component';
import { TaskComponent } from './task/task.component';
import { TechnicalMarketingDepartmentComponent } from './technical-marketing-department/technical-marketing-department.component';
import { VisitsSchedualsComponent } from './visits-scheduals/visits-scheduals.component';
import { VisitCustomerCodeComponent } from './visit-customer-code/visit-customer-code.component';
import { CheckBoxDoneComponent } from './check-box-done/check-box-done.component';
import { CheckBoxDone2Component } from './check-box-done2/check-box-done2.component';
import { CheckBoxDone3Component } from './check-box-done3/check-box-done3.component';
import { CheckBoxDone4Component } from './check-box-done4/check-box-done4.component';
import { CheckBoxDone5Component } from './check-box-done5/check-box-done5.component';
import { CheckBoxCancel1Component } from './check-box-cancel1/check-box-cancel1.component';
import { CheckBoxCancel2Component } from './check-box-cancel2/check-box-cancel2.component';
import { CheckBoxCancel3Component } from './check-box-cancel3/check-box-cancel3.component';
import { CheckBoxCancel4Component } from './check-box-cancel4/check-box-cancel4.component';
import { CheckBoxCancel5Component } from './check-box-cancel5/check-box-cancel5.component';


@NgModule({
  declarations: [
    LocationComponent,
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    NavbarComponent,
    MenuListComponent,
    CartComponent,
    LoginComponent,
    CustomerkindComponent,
    SalesFieldComponent,
    CompetitionCompanyComponent,
    ProductGroupComponent,
    NoteTypeComponent,
    TerritoryComponent,
    GovernorateComponent,
    UsersComponent,
    CustomerComponent,
    GroupsComponent,
    SalesRepComponent,
    GeneralSetUpComponent,
    WaitingCustomersComponent,
    AgentComponent,
    CreateQuestionComponent,
    CustRepComponent,
    CustClassRepComponent,
    CustSalesFieldRepComponent,
    CustNoteTypeRepComponent,
    CustProcuctGRepComponent,
    TotalVisitsRepComponent,
    EvalRepComponent,
    ComptionComponent,
    UpdatedCustomersComponent,
    DistributorComponent,
    FilterCustComponent,
    ChangeRepComponent,
    CustsOnMapComponent,
    SalesonMapComponent,
    AgGridCheckboxComponent,
    AgGridCheckbox2Component,
    AgGridCheckbox3Component,
    AgGridCheckbox4Component,
    GroupPermissionsComponent,
    UserPermissionsComponent,
    OperationReportComponent,
    TaskComponent,
    TechnicalMarketingDepartmentComponent,
    VisitsSchedualsComponent,
    VisitCustomerCodeComponent,
    CheckBoxDoneComponent,
    CheckBoxDone2Component,
    CheckBoxDone3Component,
    CheckBoxDone4Component,
    CheckBoxDone5Component,
    CheckBoxCancel1Component,
    CheckBoxCancel2Component,
    CheckBoxCancel3Component,
    CheckBoxCancel4Component,
    CheckBoxCancel5Component,
    
    

  ],
  imports: [
    AgmCoreModule.forRoot({ apiKey: '' }),
    BrowserModule, NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule, CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]), NoopAnimationsModule, ModalModule.forRoot(),
    FormsModule, ReactiveFormsModule, MatToolbarModule, NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [LoginActivate, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http);
}
