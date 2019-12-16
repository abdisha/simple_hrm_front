import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaryMeasureComponent } from './disciplinary-measure.component';

describe('DisciplinaryMeasureComponent', () => {
  let component: DisciplinaryMeasureComponent;
  let fixture: ComponentFixture<DisciplinaryMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaryMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaryMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
