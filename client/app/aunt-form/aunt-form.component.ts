import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "aunt-form",
    templateUrl: "aunt-form.component.html",
    styleUrls: ["aunt-form.component.css"]
})
export class AuntFormComponent {
    onLogout() {
        console.log(1);
    }
}