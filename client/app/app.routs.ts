import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: "list1", component: null },
    { path: "list2", component: null },
    { path: "", redirectTo: "list1", pathMatch: "full" }
];

export const routing = RouterModule.forRoot(appRoutes);