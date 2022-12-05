import { Injectable } from "@angular/core";
import { MenuItemData } from "@solenopsys/uimatrix-layouts";
import { firstValueFrom, map, Observable, tap } from "rxjs";
import { ArticleItem } from "./conf";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GroupService {


  articles: { [key: string]: ArticleItem } = {};

  idMap: { [key: string]: string } = {};


  constructor(private httpClient: HttpClient) {
  }

  itemTransform(item: ArticleItem): MenuItemData {
    return { link: item.path, name: item.title, items: item.children?.map(i => this.itemTransform(i)) };
  }

  public async loadMenu(rootId: string): Promise<MenuItemData[]> {
    const items: MenuItemData[] = [];
    const menu = this.articles[rootId] ? this.articles[rootId] : await this.loadPaths(rootId);
    menu.children?.forEach(i => {
      items.push(this.itemTransform(i));
    });
    return items;
  }

  public urlToId(url: string): string {
    return this.idMap[url === "/" ? "" : url];
  }

  public loadPaths(rootId: string): Promise<ArticleItem> {
    if (this.articles[rootId]) {
      return Promise.resolve(this.articles[rootId]);
    } else {
      return new Promise((resolve) => {
        firstValueFrom(
          this.httpClient.get(`/api/menu/${rootId}`)
            .pipe(map((res: any) => this.transform(res.data.results[0], "")))
            .pipe(tap(data => console.log("DATA", data)))
        ).then(
          articles => {
            this.articles[rootId] = articles;
            resolve(articles);
          }
        );
      });
    }
  }

  transform(tree: any, path: string): ArticleItem {
    let pathFragment = tree["content.group.path"];
    if (pathFragment)
      path = path + "/" + pathFragment;


    const uid = tree.uid;
    this.idMap[path] = uid;

    const children = tree["content.group.children"]?.map((item: any) => this.transform(item, path));
    return { key: pathFragment, articleId: uid, title: tree["content.group"], children, path };
  }


}
