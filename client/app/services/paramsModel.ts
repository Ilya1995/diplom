import { Injectable } from '@angular/core';

@Injectable()

export class ParamsModel {
    private user;

    public setUser(user) {
        this.user = user;
    }

    public getUser() {
        return this.user;
    }
}