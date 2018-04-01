import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { NavMenuComponent, AuntFormComponent, RegistrationFormComponent, PatientComponent, CreateWorkerFormComponent,
    NotificationComponent, PopupComponent, PatientsTableComponent, routing, HomeComponent, DoctorTableComponent
} from "./index";
import { UserService } from "./services/user.service";
import { PopupService } from "./services/popup.service";
import { NotificationService } from "./services/notification.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing],
    declarations: [
        AppComponent, NavMenuComponent, AuntFormComponent, PatientsTableComponent, HomeComponent, CreateWorkerFormComponent,
        RegistrationFormComponent, NotificationComponent, PopupComponent, PatientComponent, DoctorTableComponent],
    providers: [UserService, PopupService, NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule {

}