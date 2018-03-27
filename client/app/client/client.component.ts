import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ClientModel} from "./client.model";

@Component({
    moduleId: module.id,
    selector: "client",
    templateUrl: "client.component.html",
    styleUrls: ["client.component.css"]
})
export class ClientComponent implements OnInit{
    constructor(private activatedRoute: ActivatedRoute, private service: UserService) {}

    client = {};
    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            console.log(id);
            this.service.getClient({id: id}, (err, data: ClientModel) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                    this.client = data;
                }
            });
        });
    }

    addRole(){
        console.log(this.client);
    }
}