import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSimComponent } from './process-sim.component';

describe('ProcessSimComponent', () => {
  let component: ProcessSimComponent;
  let fixture: ComponentFixture<ProcessSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
