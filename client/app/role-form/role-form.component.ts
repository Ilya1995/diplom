import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";

@Component({
    moduleId: module.id,
    selector: "role-form",
    templateUrl: "role-form.component.html",
    styleUrls: ["role-form.component.css"]
})
export class RoleFormComponent implements OnInit{
    constructor(private service: UserService) {}

    ngOnInit() {
        this.service.getRoles((err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
    }

    save(){
        console.log('enter');
    }
}