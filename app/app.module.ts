import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HelloWorldListComponent, List1Component, routing } from "./index";

@NgModule({
    imports: [
        BrowserModule,
        routing],
    declarations: [AppComponent,HelloWorldListComponent,List1Component],
    bootstrap: [AppComponent]
})
export class AppModule {

}