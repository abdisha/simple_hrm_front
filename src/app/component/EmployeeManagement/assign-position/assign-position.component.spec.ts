import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPositionComponent } from './assign-position.component';

describe('AssignPositionComponent', () => {
  let component: AssignPositionComponent;
  let fixture: ComponentFixture<AssignPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
