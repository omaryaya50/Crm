import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustNoteTypeRepComponent } from './cust-note-type-rep.component';

describe('CustNoteTypeRepComponent', () => {
  let component: CustNoteTypeRepComponent;
  let fixture: ComponentFixture<CustNoteTypeRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustNoteTypeRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustNoteTypeRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
