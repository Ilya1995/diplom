"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { List1Component, HelloWorldListComponent } from "./index";
var list1_component_1 = require("./list1/list1.component");
var hello_world_list_component_1 = require("./hello-world-list/hello-world-list.component");
var router_1 = require("@angular/router");
var appRoutes = [
    { path: "list1", component: list1_component_1.List1Component },
    { path: "list2", component: hello_world_list_component_1.HelloWorldListComponent },
    { path: "", redirectTo: "list1", pathMatch: "full" }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routs.js.map