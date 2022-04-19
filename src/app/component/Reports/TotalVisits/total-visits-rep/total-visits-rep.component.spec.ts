import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVisitsRepComponent } from './total-visits-rep.component';

describe('TotalVisitsRepComponent', () => {
  let component: TotalVisitsRepComponent;
  let fixture: ComponentFixture<TotalVisitsRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalVisitsRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalVisitsRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
