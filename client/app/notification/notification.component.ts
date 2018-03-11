import { Component } from "@angular/core";
import { NotificationModel } from "./notification.model";
import { NotificationService } from "../services/notification.service";

@Component({
    moduleId: module.id,
    selector     : "notifications",
    templateUrl  : "notification.template.html",
    styleUrls    : ["notification.style.css"]
})

export class NotificationComponent {
    notifications: Set<NotificationModel> = new Set<NotificationModel>();

    constructor(private notificationService: NotificationService) {
        this.notificationService.getNotification()
            .subscribe((notification: NotificationModel)=> {
                this.notifications.add(notification);
                setTimeout(()=> {
                    this.closeNotification(notification);
                }, 5000);
            });
    }

    public closeNotification(notification: NotificationModel) {
        this.notifications.delete(notification);
    }
}