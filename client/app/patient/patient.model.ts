
export class PatientModel {
    public id: number;
    public date_reg: string;
    public email: string;
    public name: string;
    public number: number;
    public serial: number;
    public phone: string;
    public roleName: string;

    constructor(id: number, date_reg: string, name: string, number: number, serial: number, phone: string,
                roleName: string, email?: string) {
        this.id = id;
        this.date_reg = date_reg;
        this.email = email || '';
        this.name = name;
        this.number = number;
        this.serial = serial;
        this.phone = phone;
        this.roleName = roleName;
    }
}