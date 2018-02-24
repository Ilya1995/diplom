import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    constructor(private http: Http) {}

    authorization(data, callback) {
        let url = 'http://localhost:3550/api/authentication';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.post(url, data, options)
            .subscribe(
                function (result) {
                    let json = result.json();
                    console.log(json);
                    return callback(null, json);
                },
                function (error) {
                    console.error(error);
                    return callback(error);
                }
            )
    }
}