import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "nav-menu",
    templateUrl: "nav-menu.component.html",
    styleUrls: ["nav-menu.component.css"]
})
export class NavMenuComponent {
    onLogout() {
        console.log(1);
    }
}