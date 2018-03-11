import {Component} from "@angular/core";
import { PopupService } from "./services/popup.service";
import { NotificationService } from "./services/notification.service";
import { NotificationModel } from "./notification/notification.model";

@Component({
    moduleId: module.id,
    selector: "my-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.css"]
})
export class AppComponent {
    constructor(private popupService: PopupService, private notificationService: NotificationService) {}


    public showToast(header: string, description: string) {
        this.notificationService.showToast(new NotificationModel(header, description));
    }

    ClickButton(){
        this.popupService.showPopup({header: 'Общая информация', description: 'Закрывай скорее, хватит смотреть'}, (result) => {
            console.log(result);
        });
    }
}