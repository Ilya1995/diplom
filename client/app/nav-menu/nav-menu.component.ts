import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
    moduleId: module.id,
    selector: "nav-menu",
    templateUrl: "nav-menu.component.html",
    styleUrls: ["nav-menu.component.css"]
})
export class NavMenuComponent implements OnInit{
    user = null;
    countries = [
        {name: 'Администратор'},
        {name: 'Пациент'},
        {name: 'Доктор'},
    ];
    selectedValue = this.countries[2];

    visibleTableClients = false;

    constructor(private service: UserService) {}

    ngOnInit() {
        this.service.getLoggedUser((err, data) => {
            if (err) {
                console.error(err);
            } else {
                this.user = data;
                console.log(data);
            }
        });
    }

    checkClients() {
        this.visibleTableClients = true;
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