import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ClientsTableComponent } from "./clients-table/clients-table.component";
import { ClientComponent } from "./client/client.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent},
    { path: "clients", component: ClientsTableComponent },
    { path: "client/:id", component: ClientComponent }
];

export const routing = RouterModule.forRoot(appRoutes);