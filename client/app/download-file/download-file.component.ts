import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "download-file",
    templateUrl: "download-file.component.html"
})
export class DownloadFileComponent {
    getFile(event) {
        console.log(event.target.files);
        let files = event.target.files;
        for (let i = 0, file; file = files[i]; i++) {
            let reader = new FileReader();

            reader.onload = (function(theFile) {
                return function(e) {
                    console.log(theFile.name);
                    console.log(e.target.result);
                };
            })(file);
            //reader.readAsDataURL(file);
        }
    }
}