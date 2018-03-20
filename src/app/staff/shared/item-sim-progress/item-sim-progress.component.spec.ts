import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSimProgressComponent } from './item-sim-progress.component';

describe('ItemSimProgressComponent', () => {
  let component: ItemSimProgressComponent;
  let fixture: ComponentFixture<ItemSimProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSimProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSimProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
