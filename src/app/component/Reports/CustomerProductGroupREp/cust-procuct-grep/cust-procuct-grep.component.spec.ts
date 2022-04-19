import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustProcuctGRepComponent } from './cust-procuct-grep.component';

describe('CustProcuctGRepComponent', () => {
  let component: CustProcuctGRepComponent;
  let fixture: ComponentFixture<CustProcuctGRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustProcuctGRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustProcuctGRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
