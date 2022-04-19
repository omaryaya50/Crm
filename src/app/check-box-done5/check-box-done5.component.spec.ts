import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxDone5Component } from './check-box-done5.component';

describe('CheckBoxDone5Component', () => {
  let component: CheckBoxDone5Component;
  let fixture: ComponentFixture<CheckBoxDone5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxDone5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxDone5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
