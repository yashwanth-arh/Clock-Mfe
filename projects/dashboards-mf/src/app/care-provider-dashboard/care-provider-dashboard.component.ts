import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-care-provider-dashboard',
  templateUrl: './care-provider-dashboard.component.html',
  styleUrls: ['./care-provider-dashboard.component.scss'],
})
export class CareProviderDashboardComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(this.route.snapshot, this.router);
  }
}
