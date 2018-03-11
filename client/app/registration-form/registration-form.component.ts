import {Component, ViewEncapsulation, Output, EventEmitter} from "@angular/core";
import { UserService } from "../services/user.service";
import { PopupService } from "../services/popup.service";
import {NotificationService} from "../services/notification.service";
import {NotificationModel} from "../notification/notification.model";

@Component({
    moduleId: module.id,
    selector: "registration-form",
    templateUrl: "registration-form.component.html",
    styleUrls: ["registration-form.component.css"],
    encapsulation: ViewEncapsulation.Emulated
})
export class RegistrationFormComponent {
    constructor(private service: UserService, private popupService: PopupService, private notificationService: NotificationService) {}

    @Output() isConfirmed = new EventEmitter();

    private confirm(params) {
        // if (!params.login || !params.pass1 || !params.pass2 || !params.name) {
        //     this.notificationService.showToast(new NotificationModel('Eггoгo', 'Заполните все поля'));
        //     return;
        // }
        // if (params.pass1 !== params.pass2) {
        //     this.notificationService.showToast(new NotificationModel('Eггoгo', 'Пароли не совпадают'));
        //     return;
        // }
        this.isConfirmed.emit({result: true, data: params});
    }

    private close() {
        this.isConfirmed.emit({result: false});
    }

}
