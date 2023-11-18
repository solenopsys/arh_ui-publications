import {Component, Injectable, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {firstValueFrom, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GroupService} from "../group.service";
import {ContentNode} from "@solenopsys/fl-content";

@Component({
    selector: 'ui-text-page-group',
    templateUrl: './text-page-group.component.html',
    styleUrls: ['./text-page-group.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class TextPageGroupComponent {

    public readonly groups$: Observable<ContentNode[]>
    constructor(private activatedroute: ActivatedRoute) {
        this.groups$ = this.activatedroute.data.pipe<ContentNode[]>(
            map((data: any) => data.groups.map(group => ({
                items: group.items.map(item => ({
                    type: item.type,
                    value: item.content
                }))
            })))
        );
    }
}



