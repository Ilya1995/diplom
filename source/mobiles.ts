export interface Device {
    model: string;
    company: string;
    displayInfo(): void;
}

export class Smartphone implements Device {
    model: string;
    company: string;
    displayInfo(): void {
        console.log("Смартфон. Модель: " + this.model + " производитель: "+this.company);
    }
}

export class Tablet implements Device  {
    model: string;
    company: string;
    displayInfo(): void {
        console.log("Планшет. Модель: " + this.model + " производитель: " + this.company);
    }
}