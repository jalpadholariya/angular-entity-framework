import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeInRightAnimation} from '../../../@fury/animations/fade-in-right.animation';
import {fadeInUpAnimation} from '../../../@fury/animations/fade-in-up.animation';
import {WidgetOptions} from "../../pages/dashboard/data-model";

@Component({
    selector: 'fury-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class GridComponent implements OnInit {
    @Input() options: WidgetOptions;
    @Input() data: any;
    @Input() title: string;
    @Output() refresh = new EventEmitter();

    isLoading: boolean;
    
    columnDefs = [
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ];

    rowData = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000}
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
