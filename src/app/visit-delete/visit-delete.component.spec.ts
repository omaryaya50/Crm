import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDeleteComponent } from './visit-delete.component';

describe('VisitDeleteComponent', () => {
  let component: VisitDeleteComponent;
  let fixture: ComponentFixture<VisitDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
