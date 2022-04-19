import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustSalesFieldRepComponent } from './cust-sales-field-rep.component';

describe('CustSalesFieldRepComponent', () => {
  let component: CustSalesFieldRepComponent;
  let fixture: ComponentFixture<CustSalesFieldRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustSalesFieldRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustSalesFieldRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
