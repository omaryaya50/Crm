import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxCancel1Component } from './check-box-cancel1.component';

describe('CheckBoxCancel1Component', () => {
  let component: CheckBoxCancel1Component;
  let fixture: ComponentFixture<CheckBoxCancel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxCancel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxCancel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
