import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxCancel3Component } from './check-box-cancel3.component';

describe('CheckBoxCancel3Component', () => {
  let component: CheckBoxCancel3Component;
  let fixture: ComponentFixture<CheckBoxCancel3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxCancel3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxCancel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
