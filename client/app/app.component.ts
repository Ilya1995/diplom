import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "my-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.css"]
})
export class AppComponent {
    a: boolean = true;
    b (e) : void {
        console.log(e);
    }
    c = [
        {name: 'ilya1', age: 25},
        {name: 'ilya2', age: 25},
        {name: 'ilya3', age: 25}
    ];
    d: string = '';
}