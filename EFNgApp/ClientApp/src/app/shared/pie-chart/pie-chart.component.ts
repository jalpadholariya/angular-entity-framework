import {Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import * as Highcharts from 'highcharts';
import {WidgetOptions} from "../../pages/dashboard/data-model";
import {ChartOptions} from "chart.js";
import {defaultsDeep} from "lodash-es";
import {defaultChartOptions} from "../../../@fury/shared/chart-widget/chart-widget-defaults";

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let highcharts3D = require('highcharts/highcharts-3d.src');

highcharts3D(Highcharts);
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
Highcharts.setOptions({
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
});

@Component({
    selector: 'fury-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
    
    @Input() options: WidgetOptions;
    @Input() title: string;
    @Output() refresh = new EventEmitter();

    @Input()
    set data(value: any) {
        this._data = value;
        this.initChart();
    }
    private _data: any;
    isLoading: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    initChart() {
        Highcharts.chart('pie-container', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: this.title
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            tooltip: {
                pointFormat: 'PnL LTD: {point.y:.1f} (<b>{point.percentage:.1f}%</b>)'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    size: 300,
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Share',
                data: this._data
            }]
        });
    }

    reload() {
        this.isLoading = true;
        this.refresh.emit();
        setTimeout(() => {
            this.isLoading = false;
        }, 300);
    }
}
