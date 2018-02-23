import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
//import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HelloWorldListComponent, List1Component, DownloadFileComponent, NavMenuComponent, AuntFormComponent,
    routing } from "./index";
import { PhraseService } from "../app/shared/app.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing],
    declarations: [AppComponent,HelloWorldListComponent,List1Component,DownloadFileComponent,NavMenuComponent,
        AuntFormComponent],
    providers: [PhraseService],
    bootstrap: [AppComponent]
})
export class AppModule {

}