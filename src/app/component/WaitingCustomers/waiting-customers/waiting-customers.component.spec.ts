import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingCustomersComponent } from './waiting-customers.component';

describe('WaitingCustomersComponent', () => {
  let component: WaitingCustomersComponent;
  let fixture: ComponentFixture<WaitingCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
