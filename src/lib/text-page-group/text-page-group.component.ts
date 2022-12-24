import { Component, Injectable, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ContentNode } from "@solenopsys/lib-dgraph";
import { firstValueFrom, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GroupService } from "../group.service";

@Component({
  selector: 'ui-text-page-group',
  templateUrl: './text-page-group.component.html',
  styleUrls: ['./text-page-group.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TextPageGroupComponent implements OnInit {


  readonly groups$ = this.activatedroute.data.pipe(
    map((data: any) => {
      console.log("DATA1", data)
      return data.groups
    })
  );

  constructor(private activatedroute: ActivatedRoute) {
  }


  ngOnInit(): void {
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

      this.gs.loadPaths( route.data['rootId']).then(r => { //todo нужне рефакторинг 0x49be7

        let id = this.gs.urlToId(state.url);
        firstValueFrom(this.client.get(`/api/articles/${id}`)
        ).then((res: any) => { // todo убрать дублирование и вынести в сервис

            let r = res.data.results[0]['content.group.fragment'].map((item: any) => item.versions[0].blocks);
            resolve(r);
          }
        );
      })
    });



  }
}

