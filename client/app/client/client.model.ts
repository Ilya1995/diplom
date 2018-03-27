import {RoleModel} from "../shared/RoleModel";

export class ClientModel {
    public id: number;
    public date_reg: string;
    public email: string;
    public name: string;
    public number: number;
    public serial: number;
    public phone: string;
    public roles: RoleModel[];

    constructor(id: number, date_reg: string, name: string, number: number, serial: number, phone: string,
                roles: RoleModel[], email?: string) {
        this.id = id;
        this.date_reg = date_reg;
        this.email = email || '';
        this.name = name;
        this.number = number;
        this.serial = serial;
        this.phone = phone;
        this.roles = roles;
    }
}