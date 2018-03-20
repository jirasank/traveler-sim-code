import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPackageComponent } from './item-package.component';

describe('ItemPackageComponent', () => {
  let component: ItemPackageComponent;
  let fixture: ComponentFixture<ItemPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
