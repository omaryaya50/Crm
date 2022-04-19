import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustClassRepComponent } from './cust-class-rep.component';

describe('CustClassRepComponent', () => {
  let component: CustClassRepComponent;
  let fixture: ComponentFixture<CustClassRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustClassRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustClassRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
