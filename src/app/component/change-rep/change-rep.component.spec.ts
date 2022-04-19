import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRepComponent } from './change-rep.component';

describe('ChangeRepComponent', () => {
  let component: ChangeRepComponent;
  let fixture: ComponentFixture<ChangeRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
