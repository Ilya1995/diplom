import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Params} from "@angular/router";
import {PatientModel} from "./patient.model";
import {ParamsModel} from "../services/paramsModel";

@Component({
    moduleId: module.id,
    selector: "patient",
    templateUrl: "patient.component.html",
    styleUrls: ["patient.component.css"]
})
export class PatientComponent implements OnInit{
    constructor(private activatedRoute: ActivatedRoute, private service: UserService, private paramsModel: ParamsModel,) {}

    patient = {};
    user = {};
    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            console.log(id);
            this.service.getPatient({id: id}, (err, data: PatientModel) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                    this.patient = data;
                    this.user = this.paramsModel.getUser();
                    console.log(this.user);
                }
            });
        });
    }
}