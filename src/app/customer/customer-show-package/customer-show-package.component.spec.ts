import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerShowPackageComponent } from './customer-show-package.component';

describe('CostomerShowPackageComponent', () => {
  let component: CustomerShowPackageComponent;
  let fixture: ComponentFixture<CustomerShowPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerShowPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerShowPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
