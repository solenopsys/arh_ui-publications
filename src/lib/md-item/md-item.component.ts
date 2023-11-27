import {Component, Input, ViewEncapsulation} from "@angular/core";


@Component({
    selector: 'ui-md-item-component',
    templateUrl: './md-item.component.html',
    styleUrls: ['./md-item.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class MdItemComponent {

    @Input()
    data:{type:string,children:any[],value:string,params:{[key:string]:string}}

    constructor() {
    }

}