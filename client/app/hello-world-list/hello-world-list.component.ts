import { Component, OnInit } from "@angular/core";
import { Phrase } from "./phrase";
import { PhraseService } from "../shared/app.service";

@Component({
    moduleId: module.id,
    selector: "hello-world-list",
    templateUrl: "hello-world-list.component.html",
    styleUrls: ["hello-world-list.component.css"]
})
export class HelloWorldListComponent implements OnInit{
    phraseList: Phrase[];

    constructor(private phrase: PhraseService) {
        this.phraseList = [];
    }

    ngOnInit() {
        this.phrase.getPhrase().subscribe(phraseList => this.phraseList = phraseList);
    }

    selectedPhraseLanguage: string;

    // Обработчик события, к которому привязаны элементы li из файла hello-world-list.component.html
    onSelect(selected: Phrase) {
        this.selectedPhraseLanguage = selected.language;
    }
}