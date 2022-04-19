import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernorateComponent } from './governorate.component';

describe('GovernorateComponent', () => {
  let component: GovernorateComponent;
  let fixture: ComponentFixture<GovernorateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovernorateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
