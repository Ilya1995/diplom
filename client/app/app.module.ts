import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { NavMenuComponent, AuntFormComponent, RegistrationFormComponent, RoleFormComponent,
    NotificationComponent, PopupComponent, ClientsTableComponent, routing } from "./index";
import { UserService } from "./services/user.service";
import { PopupService } from "./services/popup.service";
import { NotificationService } from "./services/notification.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule],
        // routing],
    declarations: [
        AppComponent, NavMenuComponent, AuntFormComponent, ClientsTableComponent,
        RegistrationFormComponent, NotificationComponent, PopupComponent, RoleFormComponent],
    providers: [UserService, PopupService, NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule {

}