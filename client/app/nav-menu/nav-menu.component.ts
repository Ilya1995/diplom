import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "nav-menu",
    templateUrl: "nav-menu.component.html",
    styleUrls: ["nav-menu.component.css"]
})
export class NavMenuComponent implements OnInit{
    user = null;
    countries = [];
    selectedValue = 'Пациент';

    constructor(private router: Router, private service: UserService) {}

    ngOnInit() {
        this.service.getLoggedUser((err, data) => {
            if (err) {
                console.error(err);
            } else {
                this.user = data;
                this.countries = data.roles;
                this.selectedValue = this.countries[0];
                console.log(data);
            }
        });
    }

    isAunt(data) {
        this.user = data;
        this.countries = data.roles;
        this.selectedValue = this.countries[0];
        console.log(data);
    }

    logout() {
        this.service.logout((err) => {
            this.home();
            if (err) {
                console.error(err);
            } else {
                this.user = null;
            }
        });
    }

    home() {
        this.router.navigate(['home']);
    }
}