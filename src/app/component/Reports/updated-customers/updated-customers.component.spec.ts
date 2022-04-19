import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedCustomersComponent } from './updated-customers.component';

describe('UpdatedCustomersComponent', () => {
  let component: UpdatedCustomersComponent;
  let fixture: ComponentFixture<UpdatedCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
