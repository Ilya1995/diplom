import { PHRASES } from "./phrases";
import { Phrase } from "../hello-world-list/phrase";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable()
export class PhraseService {
    phrase: Phrase[] = [];

    constructor(private http: Http) {}

    getPhrase(): Observable<Phrase[]> {
        // let headers = new Headers({'Content-Type': 'application/json'});
        // let options = new RequestOptions({headers});
        return this.http.get('http://localhost:3550/api/phrases')
            .map(res => res.json().data as Phrase[])
            .map(phrases => this.phrase = phrases)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}