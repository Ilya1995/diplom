import {Component, ViewEncapsulation} from "@angular/core";
import { UserService } from "../services/user.service";
import {NotificationService} from "../services/notification.service";
import {NotificationModel} from "../notification/notification.model";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "registration-form",
    templateUrl: "registration-form.component.html",
    styleUrls: ["registration-form.component.css"],
    encapsulation: ViewEncapsulation.Emulated
})
export class RegistrationFormComponent {
    constructor(private router: Router, private service: UserService, private notificationService: NotificationService) {}

    checkbox = null;
    private confirm(params) {
        if (!this.checkbox) {
            this.notificationService.showToast(new NotificationModel('Eггoгo', 'Необходимо ' +
                'согласиться на обработку персональных данных'));
            return;
        }
        // if (!params.login || !params.pass1 || !params.pass2 || !params.name) {
        //     this.notificationService.showToast(new NotificationModel('Eггoгo', 'Заполните все поля'));
        //     return;
        // }
        // if (params.pass1 !== params.pass2) {
        //     this.notificationService.showToast(new NotificationModel('Eггoгo', 'Пароли не совпадают'));
        //     return;
        // }
        this.service.registration(params);
        this.router.navigate(['home']);
    }

    private close() {
        this.router.navigate(['home']);
    }

}
