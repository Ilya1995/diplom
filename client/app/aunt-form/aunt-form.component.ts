import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
    moduleId: module.id,
    selector: "aunt-form",
    templateUrl: "aunt-form.component.html",
    styleUrls: ["aunt-form.component.css"]
})
export class AuntFormComponent {
    @Input() user;
    @Output() isAunt = new EventEmitter();

    constructor(private service: UserService) {}


    entry(login, password) {
        if (!login || !password) {
            alert('Заполни оба поля');
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

    isModalDialogVisible: boolean = false;
    showDialogReg() {
        this.isModalDialogVisible = true;
    }

    closeModalReg(data) {
        this.isModalDialogVisible = false;
        if (data.result) {
            this.service.registration(data.data);
        }
    }
}