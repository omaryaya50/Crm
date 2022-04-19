import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFieldComponent } from './sales-field.component';

describe('SalesFieldComponent', () => {
  let component: SalesFieldComponent;
  let fixture: ComponentFixture<SalesFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
