import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxCancel4Component } from './check-box-cancel4.component';

describe('CheckBoxCancel4Component', () => {
  let component: CheckBoxCancel4Component;
  let fixture: ComponentFixture<CheckBoxCancel4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxCancel4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxCancel4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
