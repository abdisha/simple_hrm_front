import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmployementTypeComponent } from './change-employement-type.component';

describe('ChangeEmployementTypeComponent', () => {
  let component: ChangeEmployementTypeComponent;
  let fixture: ComponentFixture<ChangeEmployementTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmployementTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmployementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
