export class NotificationModel {
    public header: string;
    public description: string;

    constructor(header: string, description: string) {
        this.header      = header;
        this.description = description;
    }
}