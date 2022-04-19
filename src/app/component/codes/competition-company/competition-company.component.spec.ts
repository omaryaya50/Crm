import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionCompanyComponent } from './competition-company.component';

describe('CompetitionCompanyComponent', () => {
  let component: CompetitionCompanyComponent;
  let fixture: ComponentFixture<CompetitionCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
