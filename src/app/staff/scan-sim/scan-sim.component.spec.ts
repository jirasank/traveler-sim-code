import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanSimComponent } from './scan-sim.component';

describe('ScanSimComponent', () => {
  let component: ScanSimComponent;
  let fixture: ComponentFixture<ScanSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
