import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustsOnMapComponent } from './custs-on-map.component';

describe('CustsOnMapComponent', () => {
  let component: CustsOnMapComponent;
  let fixture: ComponentFixture<CustsOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustsOnMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustsOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
