import {Component} from "@angular/core";
import {UserService} from "../services/user.service";

@Component({
    moduleId: module.id,
    selector: "clients-table",
    templateUrl: "clients-table.component.html",
    styleUrls: ["clients-table.component.css"]
})
export class ClientsTableComponent {
    constructor(private service: UserService) {}

    updateRoleVisible = false;

    clients = [];
    seachClient = '';

    updateRole(client) {
        console.log(client);
        this.updateRoleVisible = true;
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