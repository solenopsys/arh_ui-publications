import {Component, Injectable, OnInit, ViewEncapsulation} from "@angular/core";
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
            map((data: any) => {
                console.log("DATA1", data)
                const transformed = data.groups.map((group: { items: any [] }) => {
                        return {
                            items: group.items.map((item: { type: string, content: string }) => {
                                return {type: item.type, value: item.content}
                            })
                        }
                    }
                )
                console.log("DATA2", transformed)
                return transformed
            })
        )
        ;
    }


}


@Injectable({providedIn: 'root'})
export class TextGroupByPatchResolver implements Resolve<ContentNode[]> {
    constructor(private client: HttpClient, private gs: GroupService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<ContentNode[]> {


        return new Promise(resolve => {
            const currentId = this.gs.urlToId(state.url);
            console.log("currentId", currentId)

            const rootId = currentId ? currentId : route.data['rootId']
            this.gs.loadPaths(rootId).then(r => {


                const articles = r['articles']

                const promies = []
                for (let i = 0; i < articles.length; i++) {
                    promies.push(firstValueFrom(this.client.get(`/dag?key=article&cid=${articles[i]}`)));
                }

                Promise.all(promies).then((res: any) => {
                    const result = []
                    for (let i = 0; i < res.length; i++) {
                        result.push(res[i])
                    }
                    resolve(result);
                });


            })
        });


    }
}

