import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import {PopupService} from "./popup.service";
import {NotificationModel} from "../notification/notification.model";
import {NotificationService} from "./notification.service";

@Injectable()
export class UserService {
    constructor(private http: Http, private popupService: PopupService, private notificationService: NotificationService) {}

    addWorker(data) {
        let url = '/api/addWorker';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.post(url, data, options)
            .subscribe(
                (result) => {
                    let json = result.json();
                    console.log(json);
                    if (json.result) {
                        this.popupService.showPopup({header: 'Информация', description: 'Пользователь создан!'},
                            ()=>{});
                    } else {
                        this.popupService.showPopup({header: 'Ошибка', description: 'Повторите попытку позже!'},
                            ()=>{});
                    }
                },
                (error) => {
                    console.error(error);
                    this.popupService.showPopup({header: 'Ошибка', description: 'Повторите попытку позже!'},
                        ()=>{});
                }
            )
    }

    getDoctorTypes(callback) {
        let url = '/api/getDoctorTypes';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.get(url, options)
            .subscribe(
                (result) => {
                    let json = result.json();
                    console.log(json);
                    if (json.result) {
                        return callback(null, json.data);
                    }
                    return callback(json.note);
                },
                (error) => {
                    console.error(error);
                    return callback(error);
                }
            )
    }

    getDoctors(data, callback) {
        let url = '/api/getDoctors';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.post(url, data, options)
            .subscribe(
                (result) => {
                    let json = result.json();
                    console.log(json);
                    if (json.result) {
                        return callback(null, json.data);
                    }
                    return callback(json.note);
                },
                (error) => {
                    console.error(error);
                    return callback(error);
                }
            )
    }

    getPatient(data, callback) {
        let url = '/api/getPatient/' + data.id;
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.get(url, options)
            .subscribe(
                (result) => {
                    let json = result.json();
                    console.log(json);
                    if (json.result) {
                        return callback(null, json.data);
                    }
                    return callback(json.note);
                },
                (error) => {
                    console.error(error);
                    return callback(error);
                }
            )
    }

    getPatients(data, callback) {
        let url = '/api/getPatients';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.post(url, data, options)
            .subscribe(
                (result) => {
                    let json = result.json();
                    console.log(json);
                    if (json.result) {
                        return callback(null, json.data);
                    }
                    return callback(json.note);
                },
                (error) => {
                    console.error(error);
                    return callback(error);
                }
            )
    }

    registration(data) {
        let url = '/api/registration';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.post(url, data, options)
            .subscribe(
                (result) => {
                    let json = result.json();
                    console.log(json);
                    if (json.result) {
                        this.popupService.showPopup({header: 'Регистрация', description: 'Вы зарегистрированны!'},()=>{});
                    } else {
                        this.popupService.showPopup({header: 'Регистрация', description: json.note},()=>{});
                    }
                },
                (error) => {
                    this.popupService.showPopup({header: 'Ошибка', description: 'Ошибка регистрации'},()=>{});
                    console.error(error);
                }
            )
    }

    authorization(data, callback) {
        let url = '/api/authentication';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.post(url, data, options)
            .subscribe(
                (result) => {
                    let json = result.json();
                    console.log(json);
                    if (json.result) {
                        return callback(null, json.data);
                    }
                    return callback(json.note);
                },
                (error) => {
                    console.error(error);
                    this.popupService.showPopup({header: 'Ошибка', description: 'Ошибка авторизации'},()=>{});
                    return callback(error);
                }
            )
    }

    getLoggedUser(callback) {
        let url = '/api/getLoggedUser';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.get(url, options)
            .subscribe(
                (result) => {
                    let json = result.json();
                    console.log(json);
                    if (json.result) {
                        return callback(null, json.data);
                    }
                    return callback(json.note);
                },
                (error) => {
                    console.error(error);
                    return callback(error);
                }
            )
    }

    logout(callback) {
        let url = '/api/logout';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.get(url, options)
            .subscribe(
                (result) => {
                    let json = result.json();
                    console.log(json);
                    if (json.result) {
                        return callback(null);
                    }
                    return callback(json.note);
                },
                (error) => {
                    console.error(error);
                    return callback(error);
                }
            )
    }
}