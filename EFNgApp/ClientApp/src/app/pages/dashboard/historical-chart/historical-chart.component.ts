import {Component, OnInit} from '@angular/core';
import {ModelCommodity} from "../data-model";
import {ApiService} from "../../../services/api.service";
import {FormControl} from "@angular/forms";

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
    
    modelCommodity = new FormControl('modelCommodity');
    lastRecords = new FormControl('lastRecords');
    
    commodities: Set<string>;
    isLoading: boolean;

    private rawModelCommodity: ModelCommodity[];

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.initHistoricalChart();
    }

    initHistoricalChart() {
        this.isLoading = true;
        this.yAxis = this.getTimeChartYAxis();
        this.lastRecords.setValue('10');
        this.api.getGetModelCommodity().subscribe((data: ModelCommodity[]) => {
            this.rawModelCommodity = data;
            this.commodities = new Set([...data.map(item => item.type)]);
            this.modelCommodity.setValue(data[0].type);
            this.decorateChartData();
            setTimeout(() => {
                this.isLoading = false;
            }, 300);
        });
        
    }

    decorateChartData() {
        let categories = [];
        let dataDailyPnL = [];
        let dataCumPnL = [];
        let dataDrawdown = [];
        
        this.rawModelCommodity
            .filter(r => r.type === this.modelCommodity.value) // filter using commodity dropdown
            .splice(-this.lastRecords.value) // limit records using lastRecords dropdown
            .forEach((modelCommodity) => {
                categories.push(new Date(modelCommodity.date).toLocaleDateString());
                dataDailyPnL.push(modelCommodity.pnLDaily);
                dataCumPnL.push(modelCommodity.cumPnL);
                dataDrawdown.push(modelCommodity.drawdownPnL);
            });
        
        this.categories = categories;
        this.timeChartData = this.getTimeChartData(dataDailyPnL, dataCumPnL, dataDrawdown);
    }

    private getTimeChartData(dataDailyPnL: any[], dataCumPnL: any[], dataDrawdown: any[]) {
        return [{
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

    private getTimeChartYAxis() {
        return [{ // Primary yAxis
            labels: {
                format: '{value}'
            },
            title: {
                text: 'Daily PnL'
            }

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Drawdown'
            },
            labels: {
                format: '{value}'
            },
            opposite: true

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Cumulative PnL'
            },
            labels: {
                format: '{value}'
            },
            opposite: true
        }];
    }
}
