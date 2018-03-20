import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierShowPackageComponent } from './cashier-show-package.component';

describe('CashierShowPackageComponent', () => {
  let component: CashierShowPackageComponent;
  let fixture: ComponentFixture<CashierShowPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierShowPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierShowPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
