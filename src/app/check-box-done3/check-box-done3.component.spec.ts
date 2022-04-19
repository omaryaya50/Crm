import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxDone3Component } from './check-box-done3.component';

describe('CheckBoxDone3Component', () => {
  let component: CheckBoxDone3Component;
  let fixture: ComponentFixture<CheckBoxDone3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxDone3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxDone3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
