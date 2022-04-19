import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxDone4Component } from './check-box-done4.component';

describe('CheckBoxDone4Component', () => {
  let component: CheckBoxDone4Component;
  let fixture: ComponentFixture<CheckBoxDone4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxDone4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxDone4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
