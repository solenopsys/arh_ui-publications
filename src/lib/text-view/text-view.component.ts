import {Component, Input} from '@angular/core';
import {ContentNode, ContentNodeType} from "@solenopsys/fl-content";


@Component({
  selector: 'ui-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.scss']
})
export class TextViewComponent   {
  @Input()
  blocks: ContentNode[] | undefined;
  TN = ContentNodeType;
  id: string | undefined;
}
