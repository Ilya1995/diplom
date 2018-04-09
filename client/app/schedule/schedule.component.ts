import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "schedule",
    templateUrl: "schedule.component.html",
    styleUrls: ["schedule.component.css"]
})
export class ScheduleComponent implements OnInit{
    constructor(private activatedRoute: ActivatedRoute,private service: UserService) {}

    schedules = [];

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            console.log(id);
            this.service.getScheduleDoctor({id: id}, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                    this.schedules = data;
                }
            });
        });
    }

    // getDoctors() {
    //     this.service.getDoctors({name: this.seachDoctor}, (err, data) => {
    //         this.seachDoctor = '';
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             this.doctors = data;
    //             console.log(data);
    //         }
    //     });
    // }
}