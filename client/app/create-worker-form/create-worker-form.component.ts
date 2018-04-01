import {Component, ViewEncapsulation, Output, EventEmitter, Input, OnInit} from "@angular/core";
import { UserService } from "../services/user.service";
import {NotificationService} from "../services/notification.service";
import {NotificationModel} from "../notification/notification.model";
import {Router} from "@angular/router";
import { DoctorTypesModel } from "./doctorTypesModel";

@Component({
    moduleId: module.id,
    selector: "create-worker-form",
    templateUrl: "create-worker-form.component.html",
    styleUrls: ["create-worker-form.component.css"],
    encapsulation: ViewEncapsulation.Emulated
})
export class CreateWorkerFormComponent implements OnInit{
    constructor(private router: Router, private service: UserService, private notificationService: NotificationService) {}

    @Input() worker;
    @Output() isConfirmed = new EventEmitter();

    newWorker = {};
    doctorTypes: DoctorTypesModel[] = [];
    selectedValue;

    ngOnInit() {
        if (this.worker == 'doctor') {
            this.service.getDoctorTypes((err, data: DoctorTypesModel[]) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                    this.doctorTypes = data;
                    this.selectedValue = data[0];
                }
            });
        }
    }

    private confirm(params) {
        // if (!params.phone || !params.pass || !params.name) {
        //     this.notificationService.showToast(new NotificationModel('Eггoгo', 'Заполните все поля'));
        //     return;
        // }

        this.worker == 'doctor' ? this.newWorker['roleId'] = 3 : this.newWorker['roleId'] = 1;
        this.worker == 'doctor' ? this.newWorker['doctorTypeId'] = this.selectedValue.id : null;

        this.isConfirmed.emit({result: true, data: this.newWorker});
    }

    private close() {
        this.isConfirmed.emit({result: false});
    }

}
