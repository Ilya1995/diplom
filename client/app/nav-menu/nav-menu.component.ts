import { Component, OnInit } from "@angular/core";
import {AppService} from "../shared/app.service";

@Component({
    moduleId: module.id,
    selector: "nav-menu",
    templateUrl: "nav-menu.component.html",
    styleUrls: ["nav-menu.component.css"]
})
export class NavMenuComponent implements OnInit{
    user = null;

    constructor(private service: AppService) {}

    ngOnInit() {
        this.service.getLoggedUser((err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
    }

    isAunt(data) {
        this.user = data;
        console.log(data);
    }

    logout() {
        this.service.logout((err) => {
            if (err) {
                console.error(err);
            } else {
                this.user = null;
            }
        });
    }
}