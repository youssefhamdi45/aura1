import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-upload.component.html',
  styleUrls: ['./medical-upload.component.css']
})
export class MedicalUploadComponent {
  // Upload state
  uploadedFile: File | null = null;
  uploadedFileName: string = '';
  uploadProgress: number = 0;
  isUploading: boolean = false;
  uploadComplete: boolean = false;

  // Face recognition state
  faceRecognitionActive: boolean = false;
  faceRecognitionComplete: boolean = false;
  faceRecognitionProgress: number = 0;

  // UI State
  currentStep: 'upload' | 'face' | 'complete' = 'upload';
  errorMessage: string = '';

  constructor(private router: Router) {}

  // Handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type (PDF)
      if (file.type !== 'application/pdf') {
        this.errorMessage = 'Veuillez sélectionner un fichier PDF';
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.errorMessage = 'Le fichier ne doit pas dépasser 10 MB';
        return;
      }

      this.uploadedFile = file;
      this.uploadedFileName = file.name;
      this.errorMessage = '';
    }
  }

  // Upload file
  async uploadFile(): Promise<void> {
    if (!this.uploadedFile) {
      this.errorMessage = 'Veuillez sélectionner un fichier';
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        this.uploadProgress = i;
        await this.delay(200);
      }

      this.uploadComplete = true;
      this.isUploading = false;

      // Wait a bit before moving to next step
      await this.delay(1000);
      this.currentStep = 'face';
    } catch (error) {
      this.errorMessage = 'Erreur lors du téléchargement. Veuillez réessayer.';
      this.isUploading = false;
    }
  }

  // Remove uploaded file
  removeFile(): void {
    this.uploadedFile = null;
    this.uploadedFileName = '';
    this.uploadProgress = 0;
    this.uploadComplete = false;
    this.errorMessage = '';
  }

  // Start face recognition
  async startFaceRecognition(): Promise<void> {
    this.faceRecognitionActive = true;
    this.faceRecognitionProgress = 0;

    try {
      // Simulate face recognition process
      for (let i = 0; i <= 100; i += 5) {
        this.faceRecognitionProgress = i;
        await this.delay(150);
      }

      this.faceRecognitionComplete = true;
      this.faceRecognitionActive = false;

      // Wait before moving to complete step
      await this.delay(1000);
      this.currentStep = 'complete';
    } catch (error) {
      this.errorMessage = 'Erreur lors de la reconnaissance faciale. Veuillez réessayer.';
      this.faceRecognitionActive = false;
    }
  }

  // Skip face recognition
  skipFaceRecognition(): void {
    this.currentStep = 'complete';
  }

  // Complete registration
  completeRegistration(): void {
    this.router.navigate(['/dashboard']);
  }

  // Go back to previous step
  goBack(): void {
    if (this.currentStep === 'face') {
      this.currentStep = 'upload';
      this.faceRecognitionActive = false;
      this.faceRecognitionComplete = false;
      this.faceRecognitionProgress = 0;
    } else if (this.currentStep === 'complete') {
      this.currentStep = 'face';
    } else {
      this.router.navigate(['/signup/patient']);
    }
  }

  // Utility delay function
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
