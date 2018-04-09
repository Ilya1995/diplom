import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import {Router} from "@angular/router";
import {ParamsModel} from "../services/paramsModel";

@Component({
    moduleId: module.id,
    selector: "nav-menu",
    templateUrl: "nav-menu.component.html",
    styleUrls: ["nav-menu.component.css"]
})
export class NavMenuComponent implements OnInit{
    user = null;
    worker: string = '';

    constructor(private router: Router, private service: UserService, private paramsModel: ParamsModel) {}

    ngOnInit() {
        this.service.getLoggedUser((err, data) => {
            if (err) {
                console.error(err);
            } else {
                this.user = data;
                this.paramsModel.setUser(data);
                console.log(data);
            }
        });
    }

    isAunt(data) {
        this.user = data;
        this.paramsModel.setUser(data);
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

    private isModalDialogVisible: boolean = false;
    private showDialogCreateWorker(worker: string) {
        this.worker = worker;
        this.isModalDialogVisible = true;
    }

    private closeModalCreateWorker(data) {
        this.isModalDialogVisible = false;
        if (data.result) {
            this.service.addWorker(data.data);
        }
    }

    home() {
        this.router.navigate(['home']);
    }
}