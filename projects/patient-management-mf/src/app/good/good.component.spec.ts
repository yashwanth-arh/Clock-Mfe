import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodComponent } from './good.component';

describe('GoodComponent', () => {
  let component: GoodComponent;
  let fixture: ComponentFixture<GoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoodComponent]
    });
    fixture = TestBed.createComponent(GoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
