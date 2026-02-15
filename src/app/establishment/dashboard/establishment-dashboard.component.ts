import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-establishment-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './establishment-dashboard.component.html',
  styleUrls: ['./establishment-dashboard.component.css']
})
export class EstablishmentDashboardComponent {
  constructor(private router: Router) {}

  selectUrgentCase(): void {
    this.router.navigate(['/establishment/urgent']);
  }

  selectNormalCase(): void {
    this.router.navigate(['/establishment/normal']);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
