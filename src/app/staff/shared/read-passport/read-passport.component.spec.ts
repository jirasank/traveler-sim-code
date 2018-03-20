import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPassportComponent } from './read-passport.component';

describe('ReadPassportComponent', () => {
  let component: ReadPassportComponent;
  let fixture: ComponentFixture<ReadPassportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadPassportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
