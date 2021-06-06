import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WidgetOptions} from "../../pages/dashboard/data-model";
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let Export = require('highcharts/modules/exporting');
let OfflineExport = require('highcharts/modules/offline-exporting');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let highcharts3D = require('highcharts/highcharts-3d.src');

highcharts3D(Highcharts);
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
Export(Highcharts);
OfflineExport(Highcharts);

Highcharts.setOptions({
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
});

@Component({
    selector: 'fury-time-chart',
    templateUrl: './time-chart.component.html',
    styleUrls: ['./time-chart.component.scss']
})
export class TimeChartComponent implements OnInit {
    private _data: any;

    @Input()
    set data(value: any) {
        this._data = value;
        setTimeout(() => {
            this.initChart();
        }, 500);
    }

    @Input() categories: string[];
    @Input() yAxis: any[];

    @Input() title: string;
    @Input() subTitle: string;
    // @ViewChild('chartContainer', { read: ElementRef, static: true }) chartContainer: ElementRef;


    constructor() {
    }

    ngOnInit(): void {
    }

    initChart() {
        // @ts-ignore
        Highcharts.chart('time-container', {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: this.title,
                align: 'left'
            },
            subtitle: {
                text: this.subTitle,
                align: 'left'
            },
            xAxis: [{
                type: 'datetime',
                categories: this.categories,
                crosshair: true
            }],
            yAxis: this.yAxis,
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 35,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: this._data,
        });


    }

}
