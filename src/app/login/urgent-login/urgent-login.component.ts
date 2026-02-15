import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-urgent-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './urgent-login.component.html',
  styleUrls: ['./urgent-login.component.css']
})
export class UrgentLoginComponent {
  // Step management
  currentStep: 'selection' | 'hasCIN' | 'noCIN' = 'selection';
  
  // Form data
  hasCIN = true;
  cinNumber = '';
  isUnconscious = false;
  responsibleCIN = '';
  childName = '';
  parentCIN = '';
  secretAnswer = '';
  
  // UI states
  showFaceID = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  // Step 1: Patient type selection
  selectPatientWithCIN(): void {
    this.hasCIN = true;
    this.currentStep = 'hasCIN';
  }

  selectPatientUnder18(): void {
    this.hasCIN = false;
    this.currentStep = 'noCIN';
  }

  // Handle conscious toggle
  toggleUnconscious(): void {
    this.isUnconscious = !this.isUnconscious;
    if (this.isUnconscious) {
      this.cinNumber = '';
    }
  }

  // Face ID simulation
  activateFaceID(): void {
    this.showFaceID = true;
    this.isLoading = true;
    
    // Simulate Face ID verification
    setTimeout(() => {
      this.isLoading = false;
      this.showFaceID = false;
      this.proceedToEmergencyDashboard();
    }, 2000);
  }

  // CIN verification for conscious patient
  verifyCIN(): void {
    if (!this.cinNumber || this.cinNumber.length < 6) {
      this.errorMessage = 'Veuillez entrer un CIN valide';
      return;
    }
    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.proceedToEmergencyDashboard();
    }, 1500);
  }

  // Responsible person verification (unconscious case)
  verifyResponsible(): void {
    if (!this.responsibleCIN || this.responsibleCIN.length < 6) {
      this.errorMessage = 'Veuillez entrer le CIN du responsable';
      return;
    }
    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.proceedToEmergencyDashboard();
    }, 1500);
  }

  // Verify child (under 18)
  verifyChild(): void {
    if (!this.childName || !this.parentCIN ||!this.secretAnswer) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.proceedToEmergencyDashboard();
    }, 1500);
  }

  // Navigate to emergency dashboard
  proceedToEmergencyDashboard(): void {
    console.log('Access granted - Emergency mode');
    // TODO: Navigate to emergency dashboard
    // this.router.navigate(['/dashboard/emergency']);
    alert('Accès d\'urgence accordé - Redirection vers le tableau de bord d\'urgence');
  }

  // Go back to previous step
  goBack(): void {
    if (this.currentStep !== 'selection') {
      this.currentStep = 'selection';
      this.errorMessage = '';
    } else {
      this.router.navigate(['/login']);
    }
  }
}
