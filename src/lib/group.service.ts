import {Injectable} from "@angular/core";
import {MenuItemData} from "@solenopsys/ui-navigate";
import {firstValueFrom, map, tap} from "rxjs";
import {MenuIpfsItem} from "./conf";
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
        return this.idMap[url === "/" ? "" : url];
    }

    public async loadPaths(rootId: string): Promise<MenuIpfsItem> {

        if (this.menuNodes[rootId]) {
            console.log("ROOT EXISTS", rootId)
            return this.menuNodes[rootId];
        } else {
            console.log("NOT  EXISTS", rootId)


            return new Promise((resolve) => {
                firstValueFrom(
                    this.httpClient.get(`/dag?key=menu&cid=${rootId}`)
                        .pipe(map((res: any) =>
                            this.transform(res, "")
                        ))
                        .pipe(tap(data => console.log("DATA", data)))
                ).then(
                    (node: any) => {

                        this.menuNodes[rootId] = node;
                        resolve(node);
                    }
                );
            });


        }
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

