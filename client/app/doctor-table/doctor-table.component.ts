import {Component} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "doctor-table",
    templateUrl: "doctor-table.component.html",
    styleUrls: ["doctor-table.component.css"]
})
export class DoctorTableComponent {
    constructor(private router: Router, private service: UserService) {}

    doctors = [];
    seachDoctor = '';

    selectDoctor(id) {
        console.log(id);
        this.router.navigate(['doctor', id]);
    }

    getDoctors() {
        this.service.getDoctors({name: this.seachDoctor}, (err, data) => {
            this.seachDoctor = '';
            if (err) {
                console.error(err);
            } else {
                this.doctors = data;
                console.log(data);
            }
        });
    }
}