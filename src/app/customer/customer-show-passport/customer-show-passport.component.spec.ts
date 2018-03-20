import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerShowPassportComponent } from './customer-show-passport.component';

describe('CustomerShowPassportComponent', () => {
  let component: CustomerShowPassportComponent;
  let fixture: ComponentFixture<CustomerShowPassportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerShowPassportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerShowPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
