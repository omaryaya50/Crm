import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesonMapComponent } from './saleson-map.component';

describe('SalesonMapComponent', () => {
  let component: SalesonMapComponent;
  let fixture: ComponentFixture<SalesonMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesonMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesonMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
