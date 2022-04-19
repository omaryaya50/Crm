import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalMarketingDepartmentComponent } from './technical-marketing-department.component';

describe('TechnicalMarketingDepartmentComponent', () => {
  let component: TechnicalMarketingDepartmentComponent;
  let fixture: ComponentFixture<TechnicalMarketingDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalMarketingDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalMarketingDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
