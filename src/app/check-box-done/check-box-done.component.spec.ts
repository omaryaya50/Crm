import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxDoneComponent } from './check-box-done.component';

describe('CheckBoxDoneComponent', () => {
  let component: CheckBoxDoneComponent;
  let fixture: ComponentFixture<CheckBoxDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
