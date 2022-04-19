import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustRepComponent } from './cust-rep.component';

describe('CustRepComponent', () => {
  let component: CustRepComponent;
  let fixture: ComponentFixture<CustRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
