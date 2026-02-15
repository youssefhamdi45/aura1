import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-establishment-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './establishment-signup.component.html',
  styleUrls: ['./establishment-signup.component.css']
})
export class EstablishmentSignupComponent {
  // Form data
  nomEtablissement: string = '';
  nature: string = '';
  specialite: string = '';
  localisation: string = '';
  motDePasse: string = '';
  confirmMotDePasse: string = '';
  
  // UI State
  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Nature options
  natureOptions = [
    { value: 'clinique', label: 'Clinique' },
    { value: 'hopital', label: 'Hôpital' },
    { value: 'pharmacie', label: 'Pharmacie' },
    { value: 'medecin-prive', label: 'Médecin Privé' }
  ];

  // Specialite options (only shown for médecin privé)
  specialiteOptions = [
    { value: 'generale', label: 'Médecine Générale' },
    { value: 'psychiatrie', label: 'Psychiatrie' },
    { value: 'cardiologie', label: 'Cardiologie' },
    { value: 'pediatrie', label: 'Pédiatrie' },
    { value: 'gynecologie', label: 'Gynécologie' },
    { value: 'dermatologie', label: 'Dermatologie' },
    { value: 'ophtalmologie', label: 'Ophtalmologie' },
    { value: 'dentaire', label: 'Dentaire' },
    { value: 'orthopédie', label: 'Orthopédie' },
    { value: 'orl', label: 'ORL' }
  ];

  // 24 Wilayat de Tunis
  wilayaOptions = [
    { value: 'tunis', label: 'Tunis' },
    { value: 'ariana', label: 'Ariana' },
    { value: 'ben-arous', label: 'Ben Arous' },
    { value: 'manouba', label: 'Manouba' },
    { value: 'nabeul', label: 'Nabeul' },
    { value: 'zaghouan', label: 'Zaghouan' },
    { value: 'bizerte', label: 'Bizerte' },
    { value: 'beja', label: 'Béja' },
    { value: 'jendouba', label: 'Jendouba' },
    { value: 'kef', label: 'Le Kef' },
    { value: 'siliana', label: 'Siliana' },
    { value: 'sousse', label: 'Sousse' },
    { value: 'monastir', label: 'Monastir' },
    { value: 'mahdia', label: 'Mahdia' },
    { value: 'sfax', label: 'Sfax' },
    { value: 'kairouan', label: 'Kairouan' },
    { value: 'kasserine', label: 'Kasserine' },
    { value: 'sidi-bouzid', label: 'Sidi Bouzid' },
    { value: 'gabes', label: 'Gabès' },
    { value: 'medenine', label: 'Médenine' },
    { value: 'tataouine', label: 'Tataouine' },
    { value: 'gafsa', label: 'Gafsa' },
    { value: 'tozeur', label: 'Tozeur' },
    { value: 'kebili', label: 'Kébili' }
  ];

  constructor(private router: Router) {}

  // Check if specialite should be shown
  get showSpecialite(): boolean {
    return this.nature === 'medecin-prive';
  }

  // Toggle password visibility
  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Reset specialite when nature changes
  onNatureChange(): void {
    if (this.nature !== 'medecin-prive') {
      this.specialite = '';
    }
  }

  // Validate form
  validateForm(): boolean {
    if (!this.nomEtablissement || !this.nature || !this.localisation || !this.motDePasse || !this.confirmMotDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return false;
    }

    // Check specialite for médecin privé
    if (this.nature === 'medecin-prive' && !this.specialite) {
      this.errorMessage = 'Veuillez sélectionner une spécialité';
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
      
      // Navigate to establishment dashboard
      this.router.navigate(['/establishment/dashboard']);
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
