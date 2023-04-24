import {Component, Input} from '@angular/core';
import {ContentNode, TextNodeType} from "@solenopsys/fl-dgraph";


@Component({
  selector: 'ui-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.scss']
})
export class TextViewComponent   {
  @Input()
  blocks: ContentNode[] | undefined;
  TN = TextNodeType;





  id: string | undefined;



}
