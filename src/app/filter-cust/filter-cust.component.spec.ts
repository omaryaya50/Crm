import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCustComponent } from './filter-cust.component';

describe('FilterCustComponent', () => {
  let component: FilterCustComponent;
  let fixture: ComponentFixture<FilterCustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
