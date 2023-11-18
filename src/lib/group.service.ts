import {Injectable} from "@angular/core";
import {MenuItemData} from "@solenopsys/ui-navigate";
import {firstValueFrom, map, tap} from "rxjs";
import {MenuIpfsItem} from "./model";
import {HttpClient} from "@angular/common/http";


@Injectable({
    providedIn: "root"
})
export class GroupService {
    public menuNodes: { [key: string]: MenuIpfsItem } = {};

    idMap: { [key: string]: string } = {};


    constructor(private httpClient: HttpClient) {
    }

    itemTransform(item: MenuIpfsItem): MenuItemData {
        const items = item.children?.map(i => this.itemTransform(i));
        return {link: item.path, name: item.name, items: items};
    }


    public async loadMenu(rootId: string): Promise<MenuItemData[]> {
        const items: MenuItemData[] = [];
        const menu = this.menuNodes[rootId] ? this.menuNodes[rootId] : await this.loadPaths(rootId);
        menu.children?.forEach(i => {
            items.push(this.itemTransform(i));
        });
        return items;
    }

    public urlToId(url: string): string {
        let urlFixed = url === "/" ? "" : url;
        if (!urlFixed.endsWith("/.")) {
            urlFixed= urlFixed + "/.";
        }
        return this.idMap[urlFixed];
    }

    public async loadPaths(rootId: string): Promise<MenuIpfsItem> {
        if (this.menuNodes[rootId]) {
            return this.menuNodes[rootId];
        }

        const res = await firstValueFrom(
            this.httpClient.get(`/dag?key=menu&cid=${rootId}`).pipe(
                map((res: any) => this.transform(res, "")),
                tap(data => console.log("DATA", data))
            )
        );

        this.menuNodes[rootId] = res;
        return res;
    }


    transform(tree: any, path: string): MenuIpfsItem {
        const pathFragment = tree["path"];
        if (pathFragment)
            path = path + "/" + pathFragment;
        this.idMap[path+'/.'] = tree.cid;
        const children = tree["children"]?.map((child: any) => this.transform(child, path));
        return {key: pathFragment, articles: tree["articles"], name: tree['name'], children: children, path};
    }


}

