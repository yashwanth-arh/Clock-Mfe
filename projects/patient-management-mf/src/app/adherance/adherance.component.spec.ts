import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdheranceComponent } from './adherance.component';

describe('AdheranceComponent', () => {
  let component: AdheranceComponent;
  let fixture: ComponentFixture<AdheranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdheranceComponent]
    });
    fixture = TestBed.createComponent(AdheranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
