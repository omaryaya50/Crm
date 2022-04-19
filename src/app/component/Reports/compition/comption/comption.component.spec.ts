import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptionComponent } from './comption.component';

describe('ComptionComponent', () => {
  let component: ComptionComponent;
  let fixture: ComponentFixture<ComptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
