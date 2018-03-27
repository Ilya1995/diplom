import {Component} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "clients-table",
    templateUrl: "clients-table.component.html",
    styleUrls: ["clients-table.component.css"]
})
export class ClientsTableComponent {
    constructor(private router: Router, private service: UserService) {}

    clients = [];
    seachClient = '';

    selectClient(id) {
        console.log(id);
        this.router.navigate(['client', id]);
    }

    getClients() {
        this.service.getClients({name: this.seachClient}, (err, data) => {
            this.seachClient = '';
            if (err) {
                console.error(err);
            } else {
                this.clients = data;
                console.log(data);
            }
        });
    }
}