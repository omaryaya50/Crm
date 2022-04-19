import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxDone2Component } from './check-box-done2.component';

describe('CheckBoxDone2Component', () => {
  let component: CheckBoxDone2Component;
  let fixture: ComponentFixture<CheckBoxDone2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxDone2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxDone2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
