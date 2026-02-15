import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-establishment-normal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './establishment-normal.component.html',
  styleUrls: ['./establishment-normal.component.css']
})
export class EstablishmentNormalComponent {
  // Patient authentication
  cin: string = '';
  password: string = '';
  
  // UI States
  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  isAuthenticated: boolean = false;
  
  // Patient data (simulated)
  patientData = {
    name: 'Ahmed Ben Salah',
    age: 45,
    gender: 'Masculin',
    cin: '12345678',
    bloodType: 'A+',
    address: 'Tunis, Ariana',
    phone: '+216 98 765 432',
    email: 'ahmed.bensalah@email.tn',
    allergies: ['Pénicilline', 'Arachides'],
    chronicDiseases: ['Diabète Type 2', 'Hypertension'],
    currentMedications: ['Metformine 500mg', 'Amlodipine 5mg', 'Aspirine 100mg'],
    medicalHistory: [
      {
        date: '15 Mars 2024',
        type: 'Consultation',
        doctor: 'Dr. Karim Troudi',
        diagnosis: 'Contrôle diabète',
        notes: 'HbA1c: 6.8% - Bon contrôle glycémique'
      },
      {
        date: '10 Février 2024',
        type: 'Analyses',
        doctor: 'Laboratoire Central',
        diagnosis: 'Bilan sanguin',
        notes: 'Glycémie: 110 mg/dL, Cholestérol: 180 mg/dL'
      },
      {
        date: '5 Janvier 2024',
        type: 'Consultation',
        doctor: 'Dr. Sarah Mansour',
        diagnosis: 'Suivi hypertension',
        notes: 'Tension: 130/85 mmHg - Ajustement traitement'
      }
    ],
    documents: [
      { name: 'Ordonnance - Mars 2024.pdf', date: '15/03/2024', size: '245 KB' },
      { name: 'Résultats analyses - Février 2024.pdf', date: '10/02/2024', size: '189 KB' },
      { name: 'Radiographie thorax.pdf', date: '20/01/2024', size: '1.2 MB' }
    ]
  };

  constructor(private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Authenticate patient
  async authenticate(): Promise<void> {
    this.errorMessage = '';

    // Validation
    if (!this.cin || this.cin.length !== 8) {
      this.errorMessage = 'Veuillez entrer un CIN valide (8 chiffres)';
      return;
    }

    if (!this.password || this.password.length < 6) {
      this.errorMessage = 'Veuillez entrer un mot de passe valide';
      return;
    }

    this.isLoading = true;

    try {
      await this.delay(1500);
      
      // Simulate successful authentication
      this.isAuthenticated = true;
    } catch (error) {
      this.errorMessage = 'Identifiants incorrects';
    } finally {
      this.isLoading = false;
    }
  }

  // Download document
  downloadDocument(docName: string): void {
    alert(`Téléchargement de ${docName}...`);
  }

  // View document
  viewDocument(docName: string): void {
    alert(`Ouverture de ${docName}...`);
  }

  // Go back to dashboard
  goBack(): void {
    if (this.isAuthenticated) {
      this.isAuthenticated = false;
      this.cin = '';
      this.password = '';
    } else {
      this.router.navigate(['/establishment/dashboard']);
    }
  }

  // Utility function
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
