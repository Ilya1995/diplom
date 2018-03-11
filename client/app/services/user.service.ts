import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import {PopupService} from "./popup.service";

@Injectable()
export class UserService {
    constructor(private http: Http, private popupService: PopupService) {}

    registration(data) {
        let url = 'http://localhost:3550/api/registration';
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
                    this.popupService.showPopup({header: 'Регистрация', description: 'Ошибка регистрации'},()=>{});
                    console.error(error);
                }
            )
    }

    authorization(data, callback) {
        let url = 'http://localhost:3550/api/authentication';
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

    getLoggedUser(callback) {
        let url = 'http://localhost:3550/api/getLoggedUser';
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
        let url = 'http://localhost:3550/api/logout';
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