import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateCashComponent } from './calculate-cash.component';

describe('CalculateCashComponent', () => {
  let component: CalculateCashComponent;
  let fixture: ComponentFixture<CalculateCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
