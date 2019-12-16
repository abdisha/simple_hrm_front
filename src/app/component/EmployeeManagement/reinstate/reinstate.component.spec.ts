import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinstateComponent } from './reinstate.component';

describe('ReinstateComponent', () => {
  let component: ReinstateComponent;
  let fixture: ComponentFixture<ReinstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
