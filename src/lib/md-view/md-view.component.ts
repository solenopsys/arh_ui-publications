import {Component, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, map, Observable, tap} from "rxjs";
import {ContentNode} from "@solenopsys/fl-content";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'ui-md-view',
    templateUrl: './md-view.component.html',
    styleUrls: ['./md-view.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class MdViewComponent {
    groups$

    constructor(private activatedroute: ActivatedRoute) {
        this.groups$ = this.activatedroute.data.pipe<ContentNode[]>(
            map((data: any) => data.groups)
        ).pipe(tap(groups => console.log("DECODE",groups)));
    }

}