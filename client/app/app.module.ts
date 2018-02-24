import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { HelloWorldListComponent, List1Component, NavMenuComponent, AuntFormComponent,
    routing } from "./index";
import { AppService } from "../app/shared/app.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing],
    declarations: [AppComponent,HelloWorldListComponent,List1Component,NavMenuComponent,AuntFormComponent],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule {

}