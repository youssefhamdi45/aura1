import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UrgentLoginComponent } from './login/urgent-login/urgent-login.component';
import { NormalLoginComponent } from './login/normal-login/normal-login.component';
import { PatientSignupComponent } from './signup/patient/patient-signup.component';
import { EstablishmentSignupComponent } from './signup/establishment/establishment-signup.component';
import { MedicalUploadComponent } from './signup/medical-upload/medical-upload.component';
import { EstablishmentDashboardComponent } from './establishment/dashboard/establishment-dashboard.component';
import { EstablishmentUrgentComponent } from './establishment/urgent/establishment-urgent.component';
import { EstablishmentNormalComponent } from './establishment/normal/establishment-normal.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/urgent', component: UrgentLoginComponent },
  { path: 'login/normal', component: NormalLoginComponent },
  { path: 'signup/patient', component: PatientSignupComponent },
  { path: 'signup/establishment', component: EstablishmentSignupComponent },
  { path: 'signup/patient/upload', component: MedicalUploadComponent },
  { path: 'establishment/dashboard', component: EstablishmentDashboardComponent },
  { path: 'establishment/urgent', component: EstablishmentUrgentComponent },
  { path: 'establishment/normal', component: EstablishmentNormalComponent },
  { path: '**', redirectTo: '' }
];
