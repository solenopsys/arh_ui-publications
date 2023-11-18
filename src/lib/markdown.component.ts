import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Component({
    selector: 'ui-markdown',
    template: '<markdown' +
        '  [data]="markdownContent"' +
        '  [disableSanitizer]="true">' +
        '</markdown>',
})
export class MdRendererComponent {
    markdownContent: string = '';
    constructor(private http:HttpClient) {
        this.http.get('/endpoints/solenopsys/fr-website/assets/whitepaper.md', {responseType: 'text'}).subscribe(data => {
            this.markdownContent = data;
        });
    }
    ngOnInit() { }
}