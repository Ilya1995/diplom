import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { PatientsTableComponent } from "./patients-table/patients-table.component";
import { PatientComponent } from "./patient/patient.component";
import {DoctorTableComponent} from "./doctor-table/doctor-table.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent},
    { path: "registration", component: RegistrationFormComponent },
    { path: "patients", component: PatientsTableComponent },
    { path: "patient/:id", component: PatientComponent },
    { path: "doctors", component: DoctorTableComponent }
];

export const routing = RouterModule.forRoot(appRoutes);