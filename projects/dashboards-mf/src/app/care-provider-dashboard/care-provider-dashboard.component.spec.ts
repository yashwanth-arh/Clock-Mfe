import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareProviderDashboardComponent } from './care-provider-dashboard.component';

describe('CareProviderDashboardComponent', () => {
  let component: CareProviderDashboardComponent;
  let fixture: ComponentFixture<CareProviderDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareProviderDashboardComponent]
    });
    fixture = TestBed.createComponent(CareProviderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
