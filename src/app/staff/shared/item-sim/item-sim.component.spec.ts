import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSimComponent } from './item-sim.component';

describe('ItemSimComponent', () => {
  let component: ItemSimComponent;
  let fixture: ComponentFixture<ItemSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
