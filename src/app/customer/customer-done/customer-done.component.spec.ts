import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDoneComponent } from './customer-done.component';

describe('CustomerDoneComponent', () => {
  let component: CustomerDoneComponent;
  let fixture: ComponentFixture<CustomerDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
