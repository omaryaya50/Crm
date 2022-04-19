import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxCancel2Component } from './check-box-cancel2.component';

describe('CheckBoxCancel2Component', () => {
  let component: CheckBoxCancel2Component;
  let fixture: ComponentFixture<CheckBoxCancel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxCancel2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxCancel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
