import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPackageSmallModuleComponent } from './item-package-small-module.component';

describe('ItemPackageSmallModuleComponent', () => {
  let component: ItemPackageSmallModuleComponent;
  let fixture: ComponentFixture<ItemPackageSmallModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPackageSmallModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPackageSmallModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
