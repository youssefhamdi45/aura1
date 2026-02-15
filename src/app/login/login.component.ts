import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  selectPatient(): void {
    this.router.navigate(['/signup/patient']);
  }

  selectEstablishment(): void {
    this.router.navigate(['/signup/establishment']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
