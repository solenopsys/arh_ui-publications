import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPageGroupComponent } from "./text-page-group/text-page-group.component";

import {DeclaredService} from "@solenopsys/ui-utils";

const components = [TextPageGroupComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule]
})
export class UIPublicModule {
  constructor(private ds: DeclaredService) {
    ds.addComps("@solenopsys/ui-publications", components)
  }
}
