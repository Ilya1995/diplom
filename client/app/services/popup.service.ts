import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Event } from "typescript.events/lib/server/events";
import {PopupModel} from "../popup/popup.model";

@Injectable()
export class PopupService extends Event{
    private popup: Subject<PopupModel> = new Subject<PopupModel>();

    public getPopup(): Subject<PopupModel> {
        return this.popup;
    }

    public showPopup(info: PopupModel, callback) {
        this.popup.next(info);
        this.on('closeModal', (result) => {
            console.log(result);
            return callback(result);
        });
    }
}