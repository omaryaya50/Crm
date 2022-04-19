import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSetUpComponent } from './general-set-up.component';

describe('GeneralSetUpComponent', () => {
  let component: GeneralSetUpComponent;
  let fixture: ComponentFixture<GeneralSetUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSetUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
