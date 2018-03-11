import { Component } from "@angular/core";
import {PopupService} from "../services/popup.service";
import {PopupModel} from "./popup.model";

@Component({
    moduleId: module.id,
    selector: "popup",
    templateUrl: "popup.component.html",
    styleUrls: ["popup.component.css"]
})
export class PopupComponent{
    isPopupVisible: boolean = false;
    popup: PopupModel;

    constructor(private popupService: PopupService) {
        this.popupService.getPopup()
            .subscribe((popup: PopupModel)=> {
                this.popup = popup;
                console.log(popup);
                this.isPopupVisible = true;
            });
    }

    closeModal(result: boolean) {
        this.isPopupVisible = false;
        this.popupService.emit('closeModal', result);
    }
}


