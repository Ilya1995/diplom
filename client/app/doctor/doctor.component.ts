import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ParamsModel} from "../services/paramsModel";
import {PopupService} from "../services/popup.service";
import {NotificationService} from "../services/notification.service";
import {NotificationModel} from "../notification/notification.model";

@Component({
    moduleId: module.id,
    selector: "doctor",
    templateUrl: "doctor.component.html",
    styleUrls: ["doctor.component.css"]
})
export class DoctorComponent implements OnInit{
    constructor(private activatedRoute: ActivatedRoute, private service: UserService, private paramsModel: ParamsModel,
                private popupService: PopupService, private notificationService: NotificationService, private router: Router) {}

    user = {};
    doctor = {};
    hours: number[] = [8,9,10,11,12,13,14,15,16,17,18,19,20];
    minutes: string[] = ['00','10','20','30','40','50'];
    date = {
        selectedDate: '',
        selectedHour: 8,
        selectedMinute: '00'
    };

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            console.log(id);
            this.service.getDoctor({id: id}, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                    this.doctor = data;
                    this.user = this.paramsModel.getUser();
                }
            });
        });
    }

    private enroll() {
        if (!this.date.selectedDate) {
            this.notificationService.showToast(new NotificationModel('Ошибка', 'Укажите желаемую дату'));
            return;
        }
        console.log(this.user);
        console.log(this.doctor);
        console.log(this.date);
        this.service.newEntryForAdmission({patientId: this.user['id'], doctorId: this.doctor['id'], date: this.date});
        this.router.navigate(['home']);
    }
}