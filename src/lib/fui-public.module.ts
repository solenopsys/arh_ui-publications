import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPageGroupComponent } from "./text-page-group/text-page-group.component";
import { FuiEditorModule } from "@solenopsys/uimatrix-editor-content";

@NgModule({
  declarations:[TextPageGroupComponent],
  imports: [CommonModule, FuiEditorModule]
})
export class FuiPublicModule {}
