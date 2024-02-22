import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighAlertComponent } from './high-alert.component';

describe('HighAlertComponent', () => {
  let component: HighAlertComponent;
  let fixture: ComponentFixture<HighAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighAlertComponent]
    });
    fixture = TestBed.createComponent(HighAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
