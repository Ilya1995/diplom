import { Injectable } from "@angular/core";
import { NotificationModel } from "../notification/notification.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class NotificationService {
    private notifications: Subject<NotificationModel> = new Subject<NotificationModel>();

    public getNotification(): Subject<NotificationModel> {
        return this.notifications;
    }

    public showToast(info: NotificationModel) {
        this.notifications.next(info);
    }
}