import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPageGroupComponent } from "./text-page-group/text-page-group.component";
import { UIEditorModule } from "@solenopsys/uimatrix-editor-content";
import {DeclaredService} from "@solenopsys/uimatrix-utils";

const components = [TextPageGroupComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, UIEditorModule]
})
export class UIPublicModule {
  constructor(private ds: DeclaredService) {
    ds.addComps("@solenopsys/uimatrix-publications", components)
  }
}
