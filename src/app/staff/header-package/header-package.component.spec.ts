import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPackageComponent } from './header-package.component';

describe('HeaderPackageComponent', () => {
  let component: HeaderPackageComponent;
  let fixture: ComponentFixture<HeaderPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
