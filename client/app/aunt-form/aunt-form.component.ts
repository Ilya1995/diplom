import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "../services/user.service";
import {NotificationModel} from "../notification/notification.model";
import {NotificationService} from "../services/notification.service";

@Component({
    moduleId: module.id,
    selector: "aunt-form",
    templateUrl: "aunt-form.component.html",
    styleUrls: ["aunt-form.component.css"]
})
export class AuntFormComponent {
    @Input() user;
    @Output() isAunt = new EventEmitter();

    constructor(private service: UserService, private notificationService: NotificationService) {}


    entry(login, password) {
        if (!login || !password) {
            this.notificationService.showToast(new NotificationModel('Eггoгo', 'Заполните оба поля'));
            return;
        }
        this.service.authorization({login: login, password: password},(err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
                this.isAunt.emit(data);
            }
        });
        console.log(login, password);
    }
}