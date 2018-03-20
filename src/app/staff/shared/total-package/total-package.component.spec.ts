import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPackageComponent } from './total-package.component';

describe('TotalPackageComponent', () => {
  let component: TotalPackageComponent;
  let fixture: ComponentFixture<TotalPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
