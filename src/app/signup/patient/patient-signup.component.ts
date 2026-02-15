import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.css']
})
export class PatientSignupComponent {
  // Form data
  nom: string = '';
  prenom: string = '';
  email: string = '';
  dateNaissance: string = '';
  motDePasse: string = '';
  confirmMotDePasse: string = '';
  
  // UI State
  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Validate form
  validateForm(): boolean {
    if (!this.nom || !this.prenom || !this.email || !this.dateNaissance || !this.motDePasse || !this.confirmMotDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Adresse email invalide';
      return false;
    }

    // Password validation
    if (this.motDePasse.length < 8) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 8 caractères';
      return false;
    }

    // Password match validation
    if (this.motDePasse !== this.confirmMotDePasse) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return false;
    }

    // Age validation (must be at least 18)
    const birthDate = new Date(this.dateNaissance);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 18 || (age === 18 && monthDiff < 0)) {
      this.errorMessage = 'Vous devez avoir au moins 18 ans pour vous inscrire';
      return false;
    }

    return true;
  }

  // Submit form
  async submitForm(): Promise<void> {
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    try {
      // Simulate API call
      await this.delay(2000);
      
      // Navigate to medical file upload page
      this.router.navigate(['/signup/patient/upload']);
    } catch (error) {
      this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    } finally {
      this.isLoading = false;
    }
  }

  // Go back to login
  goBack(): void {
    this.router.navigate(['/login']);
  }

  // Utility delay function
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
