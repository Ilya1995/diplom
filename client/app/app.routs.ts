import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { PatientsTableComponent } from "./patients-table/patients-table.component";
import { PatientComponent } from "./patient/patient.component";
import { DoctorTableComponent } from "./doctor-table/doctor-table.component";
import { DoctorComponent } from "./doctor/doctor.component";
import { NewRecordsComponent } from "./new-records/new-records.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { LicenseComponent } from "./license/license.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent},
    { path: "registration", component: RegistrationFormComponent },
    { path: "patients", component: PatientsTableComponent },
    { path: "patient/:id", component: PatientComponent },
    { path: "doctors", component: DoctorTableComponent },
    { path: "doctor/:id", component: DoctorComponent },
    { path: "new_records", component: NewRecordsComponent },
    { path: "schedule/:id", component: ScheduleComponent },
    { path: "license", component: LicenseComponent },
];

export const routing = RouterModule.forRoot(appRoutes);