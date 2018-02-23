import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "list-1",
    templateUrl: "list1.component.html"
})
export class List1Component {
    @Input() list;
    @Output() b = new EventEmitter();

    getList() {
        console.log(this.list);
    }

    childrenB() {
        this.b.emit('213');
        console.log(99);
    }

}