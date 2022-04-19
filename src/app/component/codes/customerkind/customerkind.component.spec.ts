import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerkindComponent } from './customerkind.component';

describe('CustomerkindComponent', () => {
  let component: CustomerkindComponent;
  let fixture: ComponentFixture<CustomerkindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerkindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerkindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
