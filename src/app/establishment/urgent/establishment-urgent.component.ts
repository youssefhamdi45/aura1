import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-establishment-urgent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './establishment-urgent.component.html',
  styleUrls: ['./establishment-urgent.component.css']
})
export class EstablishmentUrgentComponent {
  // Patient identification
  cin: string = '';
  patientName: string = '';
  patientAge: string = '';
  bloodType: string = '';
  
  // UI States
  isScanning: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  patientFound: boolean = false;
  showPatientInfo: boolean = false;
  
  // Medical data (simulated)
  medicalData = {
    allergies: ['Pénicilline', 'Arachides'],
    chronicDiseases: ['Diabète Type 2', 'Hypertension'],
    currentMedications: ['Metformine 500mg', 'Amlodipine 5mg'],
    emergencyContact: '+216 98 765 432',
    bloodType: 'A+',
    lastVisit: '15 Mars 2024'
  };

  constructor(private router: Router) {}

  // Quick patient access (mode inconscient)
  quickAccess(): void {
    this.isScanning = true;
    
    // Simulate biometric scan
    setTimeout(() => {
      this.isScanning = false;
      this.patientFound = true;
      this.showPatientInfo = true;
      this.patientName = 'Patient en mode inconscient';
      this.bloodType = this.medicalData.bloodType;
    }, 2000);
  }

  // Search by CIN
  async searchByCin(): Promise<void> {
    this.errorMessage = '';
    
    if (!this.cin || this.cin.length !== 8) {
      this.errorMessage = 'Veuillez entrer un CIN valide (8 chiffres)';
      return;
    }

    this.isLoading = true;

    try {
      await this.delay(1500);
      
      // Simulate patient found
      this.patientFound = true;
      this.showPatientInfo = true;
      this.patientName = 'Ahmed Ben Salah';
      this.patientAge = '45 ans';
      this.bloodType = this.medicalData.bloodType;
    } catch (error) {
      this.errorMessage = 'Patient non trouvé';
    } finally {
      this.isLoading = false;
    }
  }

  // Go back to dashboard
  goBack(): void {
    this.router.navigate(['/establishment/dashboard']);
  }

  // Call emergency contact
  callEmergencyContact(): void {
    alert(`Appel du contact d'urgence: ${this.medicalData.emergencyContact}`);
  }

  // Utility function
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
