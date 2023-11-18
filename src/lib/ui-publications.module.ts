import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextPageGroupComponent} from "./text-page-group/text-page-group.component";

import {DeclaredService} from "@solenopsys/ui-utils";
import {TextViewComponent} from "./text-view/text-view.component";
import {MdViewComponent} from "./md-view/md-view.component";
import {MdItemComponent} from "./md-item/md-item.component";

const components = [TextPageGroupComponent, TextViewComponent, MdViewComponent,MdItemComponent];

@NgModule({
    declarations: components,
    imports: [CommonModule]
})
export class UiPublicationsModule {
    constructor(private ds: DeclaredService) {
        ds.addComps("@solenopsys/ui-publications", components)
    }
}
