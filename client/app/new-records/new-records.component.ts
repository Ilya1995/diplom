import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "new-records",
    templateUrl: "new-records.component.html",
    styleUrls: ["new-records.component.css"]
})
export class NewRecordsComponent implements OnInit{
    constructor(private router: Router, private service: UserService) {}

    newRecords = [];
    ngOnInit() {
        this.service.getNewRecords((err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
                this.newRecords = data;
            }
        });
    }

    addRecord(id,index) {
        console.log(index);
        let record =  this.newRecords[index];
        this.service.addRecord({doctorId: record.doctor_id,recordId: id},
            (res) => {
                res ? this.newRecords.splice(index, 1) : null;
        });
    }

    deleteRecord(id,index) {
        this.service.deleteRecord({recordId: id}, (res) => {
            res ? this.newRecords.splice(index, 1) : null;
        });

    }

}