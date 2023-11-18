import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ContentNode} from "@solenopsys/fl-content";
import {HttpClient} from "@angular/common/http";
import {GroupService} from "@solenopsys/ui-publications";
import {firstValueFrom} from "rxjs";

@Injectable({providedIn: 'root'})
export class TextGroupByPatchResolver implements Resolve<ContentNode[]> {
    constructor(private client: HttpClient, private gs: GroupService) {
    }

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<ContentNode[]> {

        const currentId = this.gs.urlToId(state.url);
        const rootId = currentId || route.parent.data['ipfs'];
        const r = await this.gs.loadPaths(rootId);
        const articles = r['articles'];

        const articlePromises = articles.map(article =>
            firstValueFrom(this.client.get<ContentNode>(`/dag?key=article&cid=${article}`))
        );

        return await Promise.all(articlePromises);
    }
}