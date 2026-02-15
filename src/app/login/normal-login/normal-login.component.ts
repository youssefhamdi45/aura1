import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-normal-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './normal-login.component.html',
  styleUrls: ['./normal-login.component.css']
})
export class NormalLoginComponent {
  // Step management
  currentStep: 'selection' | 'cinLogin' | 'minorLogin' | 'qrCode' = 'selection';
  
  // CIN Login
  cinNumber: string = '';
  
  // Minor Login
  childFullName: string = '';
  parentCIN: string = '';
  secretQuestion: string = '';
  secretAnswer: string = '';
  
  // QR Code
  qrCodeData: string = '';
  userName: string = '';
  
  // UI State
  isLoading: boolean = false;
  errorMessage: string = '';
  
  // Available secret questions
  secretQuestions = [
    "Nom de jeune fille de votre mère",
    "Ville de naissance de votre père",
    "Nom de votre premier animal de compagnie",
    "Prénom de votre meilleur(e) ami(e) d'enfance",
    "Nom de votre école primaire"
  ];

  constructor(private router: Router) {}

  // Navigate to CIN login
  selectCINLogin(): void {
    this.currentStep = 'cinLogin';
    this.resetErrors();
  }

  // Navigate to minor login
  selectMinorLogin(): void {
    this.currentStep = 'minorLogin';
    this.resetErrors();
  }

  // Go back to selection
  goBack(): void {
    if (this.currentStep === 'selection') {
      this.router.navigate(['/login']);
    } else if (this.currentStep === 'qrCode') {
      // Cannot go back from QR code screen
      return;
    } else {
      this.currentStep = 'selection';
      this.resetErrors();
    }
  }

  // Verify CIN and authenticate
  async verifyCIN(): Promise<void> {
    if (!this.cinNumber || this.cinNumber.length < 8) {
      this.errorMessage = 'Veuillez entrer un numéro CIN valide';
      return;
    }

    this.isLoading = true;
    this.resetErrors();

    try {
      // Simulate API call (3 seconds)
      await this.delay(3000);
      
      // Simulate successful authentication
      this.userName = 'Mohamed Ahmed'; // Would come from API
      this.generateQRCode();
      this.currentStep = 'qrCode';
    } catch (error) {
      this.errorMessage = 'CIN non reconnu. Veuillez vérifier et réessayer.';
    } finally {
      this.isLoading = false;
    }
  }

  // Verify minor login
  async verifyMinor(): Promise<void> {
    if (!this.childFullName || !this.parentCIN || !this.secretQuestion || !this.secretAnswer) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.parentCIN.length < 8) {
      this.errorMessage = 'Numéro CIN du parent invalide';
      return;
    }

    this.isLoading = true;
    this.resetErrors();

    try {
      // Simulate API call (3 seconds)
      await this.delay(3000);
      
      // Simulate successful authentication
      this.userName = this.childFullName;
      this.generateQRCode();
      this.currentStep = 'qrCode';
    } catch (error) {
      this.errorMessage = 'Vérification échouée. Les informations ne correspondent pas.';
    } finally {
      this.isLoading = false;
    }
  }

  // Generate QR Code data
  private generateQRCode(): void {
    const timestamp = new Date().getTime();
    const sessionId = Math.random().toString(36).substring(2, 15);
    
    // In production, this would be a JWT token or secure session ID
    this.qrCodeData = `DOSSIER_VITAL_${sessionId}_${timestamp}`;
  }

  // Navigate to signup page
  navigateToSignup(): void {
    this.router.navigate(['/login']);
  }

  // Logout and return to selection
  logout(): void {
    this.currentStep = 'selection';
    this.resetForm();
  }

  // Reset form data
  private resetForm(): void {
    this.cinNumber = '';
    this.childFullName = '';
    this.parentCIN = '';
    this.secretQuestion = '';
    this.secretAnswer = '';
    this.qrCodeData = '';
    this.userName = '';
    this.resetErrors();
  }

  // Reset error messages
  private resetErrors(): void {
    this.errorMessage = '';
  }

  // Utility function for simulating async operations
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
