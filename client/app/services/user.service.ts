import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import {PopupService} from "./popup.service";

@Injectable()
export class UserService {
    constructor(private http: Http, private popupService: PopupService) {}

    getClient(data, callback) {
        let url = '/api/getClient/' + data.id;
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

    getClients(data, callback) {
        let url = '/api/getClients';
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