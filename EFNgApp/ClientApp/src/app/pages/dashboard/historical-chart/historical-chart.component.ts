import {Component, OnInit} from '@angular/core';
import {ModelCommodity} from "../data-model";
import {HelperService} from "../../../services/helper.service";
import {ApiService} from "../../../services/api.service";
import {FormControl} from "@angular/forms";
import {distinctUntilChanged} from "rxjs/operators";
import {set} from "lodash-es";

@Component({
    selector: 'fury-historical-chart',
    templateUrl: './historical-chart.component.html',
    styleUrls: ['./historical-chart.component.scss']
})
export class HistoricalChartComponent implements OnInit {
    /**
     * Historical Chart
     */
    timeChartData;
    yAxis;
    categories;
    isLoading: boolean;

    modelCommodity = new FormControl('modelCommodity');
    lastRecords = new FormControl('lastRecords');
    commodities: Set<string>;

    private rawModelCommodity: ModelCommodity[];

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.initHistoricalChart();
    }

    initHistoricalChart() {
        this.isLoading = true;
        this.yAxis = HelperService.getTimeChartYAxis();
        this.lastRecords.setValue('100');
        this.api.getGetModelCommodity().subscribe((data: ModelCommodity[]) => {
            this.rawModelCommodity = data;
            this.commodities = new Set([...data.map(item => item.type)]);
            this.modelCommodity.setValue(data[0].type);
            this.decorateChartData();
            this.isLoading = false;
        });
        
    }

    decorateChartData() {
        let categories = [];
        let dataDailyPnL = [];
        let dataCumPnL = [];
        let dataDrawdown = [];
        
        this.rawModelCommodity
            .filter(r => r.type === this.modelCommodity.value)
            .slice(0, this.lastRecords.value)
            .forEach((modelCommodity) => {
                categories.push(new Date(modelCommodity.date).toLocaleDateString());
                dataDailyPnL.push(modelCommodity.pnLDaily);
                dataCumPnL.push(modelCommodity.cumPnL);
                dataDrawdown.push(modelCommodity.drawdownPnL);
            });
        
        this.categories = categories;
        this.timeChartData = [{
            name: 'Daily PnL',
            type: 'column',
            yAxis: 1,
            data: dataDailyPnL,
            tooltip: {
                valuePrefix: '$'
            }

        }, {
            name: 'Cumulative PnL',
            type: 'spline',
            yAxis: 2,
            data: dataCumPnL,
            marker: {
                enabled: false
            },
            tooltip: {
                valuePrefix: '$'
            }
        }, {
            name: 'Drawdown',
            type: 'spline',
            data: dataDrawdown,
            dashStyle: 'shortdot',
            tooltip: {
                valuePrefix: '$'
            }
        }];
    }
}
