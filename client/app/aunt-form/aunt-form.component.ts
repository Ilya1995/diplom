import { Component } from "@angular/core";
import { AppService } from "../shared/app.service";

@Component({
    moduleId: module.id,
    selector: "aunt-form",
    templateUrl: "aunt-form.component.html",
    styleUrls: ["aunt-form.component.css"]
})
export class AuntFormComponent {
    constructor(private service: AppService) {}

    entry(login, password) {
        if (!login || !password) {
            alert('Заполни оба поля');
            return;
        }
        this.service.authorization({login: login, password: password}, function (err, data) {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
        console.log(login, password);
    }
}