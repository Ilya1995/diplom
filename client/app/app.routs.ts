//import { List1Component, HelloWorldListComponent } from "./index";
import { List1Component } from "./list1/list1.component";
import { HelloWorldListComponent} from "./hello-world-list/hello-world-list.component";
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: "list1", component: List1Component },
    { path: "list2", component: HelloWorldListComponent },
    { path: "", redirectTo: "list1", pathMatch: "full" }
];

export const routing = RouterModule.forRoot(appRoutes);