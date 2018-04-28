import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { NavMenuComponent, AuntFormComponent, RegistrationFormComponent, PatientComponent, CreateWorkerFormComponent,
    NotificationComponent, PopupComponent, PatientsTableComponent, routing, HomeComponent, DoctorTableComponent,
    DoctorComponent, NewRecordsComponent, ScheduleComponent, LicenseComponent} from "./index";
import { UserService } from "./services/user.service";
import { PopupService } from "./services/popup.service";
import { NotificationService } from "./services/notification.service";
import { ParamsModel } from "./services/paramsModel";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing],
    declarations: [
        AppComponent, NavMenuComponent, AuntFormComponent, PatientsTableComponent, HomeComponent, CreateWorkerFormComponent,
        RegistrationFormComponent, NotificationComponent, PopupComponent, PatientComponent, DoctorTableComponent,
        DoctorComponent, NewRecordsComponent, ScheduleComponent, LicenseComponent],
    providers: [UserService, PopupService, NotificationService, ParamsModel],
    bootstrap: [AppComponent]
})
export class AppModule {

}