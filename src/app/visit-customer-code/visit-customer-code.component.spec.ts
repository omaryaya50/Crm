import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCustomerCodeComponent } from './visit-customer-code.component';

describe('VisitCustomerCodeComponent', () => {
  let component: VisitCustomerCodeComponent;
  let fixture: ComponentFixture<VisitCustomerCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitCustomerCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitCustomerCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
