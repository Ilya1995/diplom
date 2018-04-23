import {Component} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "patients-table",
    templateUrl: "patients-table.component.html",
    styleUrls: ["patients-table.component.css"]
})
export class PatientsTableComponent {
    constructor(private router: Router, private service: UserService) {}

    patients = [];
    seachPatient = '';

    selectPatient(id) {
        console.log(id);
        this.router.navigate(['patient', id]);
    }

    getPatients() {
        this.service.getPatients({name: this.seachPatient}, (err, data) => {
            this.seachPatient = '';
            if (err) {
                console.error(err);
            } else {
                this.patients = data;
                console.log(data);
            }
        });
    }

    deletePatient(id, index) {
        this.service.deletePatient({patientId: id}, (res) => {
            res ? this.patients.splice(index, 1) : null;
        });
    }
}