import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { GoodsComponent } from './component/goods/goods.component';
import { AccountComponent } from './component/account/account.component';
import { MenuListComponent } from './component/menu-list/menu-list.component';
import { LoginComponent } from './component/login/login.component';
import { CustomerkindComponent } from './component/Codes/customerkind/customerkind.component';
import { SalesFieldComponent } from './component/codes/sales-field/sales-field.component';
import { CompetitionCompanyComponent } from './component/codes/competition-company/competition-company.component';
import { ProductGroupComponent } from './component/codes/product-group/product-group.component';
import { NoteTypeComponent } from './component/codes/note-type/note-type.component';
import { TerritoryComponent } from './component/codes/territory/territory.component';
import { GovernorateComponent } from './component/codes/governorate/governorate.component';
import { LoginActivate } from './component/login/LoginActivate';
import { UsersComponent } from './component/security/users/users.component';
import { CustomerComponent } from './component/customer/customer/customer.component';
import { GroupsComponent } from './component/security/groups/groups.component';
import { SalesRepComponent } from './component/codes/Sales-Rep/sales-rep/sales-rep.component';
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
import { GroupPermissionsComponent } from './group-permissions/group-permissions.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { OperationReportComponent } from './operation-report/operation-report.component';
import { TechnicalMarketingDepartmentComponent } from './technical-marketing-department/technical-marketing-department.component';
import { VisitsSchedualsComponent } from './visits-scheduals/visits-scheduals.component';



const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[LoginActivate]},
  {path: 'Customers/Customer/Location', component: LocationComponent, canActivate:[LoginActivate], data: {ProgId: '200100100'}},
  {path: 'Goods', component: GoodsComponent, canActivate:[LoginActivate], data: {ProgId: '103040000'}},
  {path: 'Account', component: AccountComponent, canActivate:[LoginActivate], data: {ProgId: '103040000'}},
  {path: 'MenuList/:id', component: MenuListComponent, canActivate:[LoginActivate], data: {ProgId: '103040000'}},
  {path: 'login', component: LoginComponent},
  {path: 'Codes/CustomerKind', component: CustomerkindComponent, canActivate:[LoginActivate], data: {ProgId: '100700000'}},
  {path: 'MenuList/:id/Cart', component: GoodsComponent, canActivate:[LoginActivate], data: {ProgId: '103040000'}},
  {path: 'Codes/SalesField', component: SalesFieldComponent, canActivate:[LoginActivate], data: {ProgId: '100300000'}},
  {path: 'Codes/CompetitionCompanies', component: CompetitionCompanyComponent, canActivate:[LoginActivate], data: {ProgId: '100500000'}},
  {path: 'Codes/ProductGroup', component: ProductGroupComponent, canActivate:[LoginActivate], data: {ProgId: '100400000'}},
  {path: 'Codes/NoteType', component: NoteTypeComponent, canActivate:[LoginActivate], data: {ProgId: '100600000'}},
  {path: 'Codes/Territory', component: TerritoryComponent, canActivate:[LoginActivate], data: {ProgId: '100100000'}},
  {path: 'Codes/SalesRep', component: SalesRepComponent, data: {ProgId: '100800000'}},
  {path: 'Codes/Governorate', component: GovernorateComponent, canActivate:[LoginActivate], data: {ProgId: '100200000'}},
  {path: 'Codes/Agent', component: AgentComponent, canActivate:[LoginActivate], data: {ProgId: '100900000'}},
  {path: 'Codes/CreateQuestion', component: CreateQuestionComponent, canActivate:[LoginActivate], data: {ProgId: '100110000'}},
  {path: 'Admin/Users', component: UsersComponent},
  {path: 'Customers/Customer', component: CustomerComponent ,canActivate:[LoginActivate], data: {ProgId: '200100000'}},
  {path: 'Admin/Groups', component: GroupsComponent, canActivate:[LoginActivate]},
  {path: 'Admin/GeneralSetUp', component: GeneralSetUpComponent, canActivate:[LoginActivate]},
  {path: 'Codes/Distributor', component: DistributorComponent, canActivate:[LoginActivate], data: {ProgId: '100101000'}},
  {path: 'Reports/CustRep', component: CustRepComponent, canActivate:[LoginActivate]},
  {path: 'Reports/CustClassRep', component: CustClassRepComponent, canActivate:[LoginActivate]},

  {path: 'Reports/CustSalesFieldRep', component: CustSalesFieldRepComponent, canActivate:[LoginActivate]},

  {path: 'Reports/CustNoteTypeRep', component: CustNoteTypeRepComponent, canActivate:[LoginActivate]},

  {path: 'Reports/CustPGRep', component: CustProcuctGRepComponent, canActivate:[LoginActivate]},

  {path: 'Reports/totalVisitsRep', component: TotalVisitsRepComponent, },
  {path: 'Reports/VisitSchedual', component: VisitsSchedualsComponent },

  {path: 'Admin/GroupPermission', component: GroupPermissionsComponent},
  {path: 'Admin/UserPermissions', component: UserPermissionsComponent},
  {path: 'Codes/TechnicalMarketingDepartment', component: TechnicalMarketingDepartmentComponent, data: {ProgId: '103040000'}},



  {path: 'Reports/EvalRep', component: EvalRepComponent, canActivate:[LoginActivate], data: {ProgId: '103040000'}},
  {path: 'Customers/ChangeRepForCustomer', component: ChangeRepComponent, canActivate:[LoginActivate]},
  {path: 'Reports/compition', component: ComptionComponent, canActivate:[LoginActivate]},
  {path: 'Reports/UpadatedCustomers', component: UpdatedCustomersComponent, canActivate:[LoginActivate]},
  {path: 'Admin/WaitingCust', component: WaitingCustomersComponent, canActivate:[LoginActivate]},
  {path: 'Reports/filterCust' , component:FilterCustComponent},
  {path: 'Reports/CustOnMap' , component:CustsOnMapComponent},
  {path: 'Reports/SalesVisitMap' , component:SalesonMapComponent},
  {path: 'Reports/OperationReport' , component:OperationReportComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
