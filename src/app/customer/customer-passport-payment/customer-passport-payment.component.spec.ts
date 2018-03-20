import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPassportPaymentComponent } from './customer-passport-payment.component';

describe('CustomerPassportPaymentComponent', () => {
  let component: CustomerPassportPaymentComponent;
  let fixture: ComponentFixture<CustomerPassportPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPassportPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPassportPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
