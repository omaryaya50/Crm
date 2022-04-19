import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsSchedualsComponent } from './visits-scheduals.component';

describe('VisitsSchedualsComponent', () => {
  let component: VisitsSchedualsComponent;
  let fixture: ComponentFixture<VisitsSchedualsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsSchedualsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsSchedualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
