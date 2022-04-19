import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxCancel5Component } from './check-box-cancel5.component';

describe('CheckBoxCancel5Component', () => {
  let component: CheckBoxCancel5Component;
  let fixture: ComponentFixture<CheckBoxCancel5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxCancel5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxCancel5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
