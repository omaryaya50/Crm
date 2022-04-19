import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalRepComponent } from './eval-rep.component';

describe('EvalRepComponent', () => {
  let component: EvalRepComponent;
  let fixture: ComponentFixture<EvalRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
