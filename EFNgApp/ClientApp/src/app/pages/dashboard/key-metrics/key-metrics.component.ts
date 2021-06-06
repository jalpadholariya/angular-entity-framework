import {Component, OnInit} from '@angular/core';
import {ChartData} from "chart.js";
import {FormControl} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {KeyMetrics} from "../data-model";
import {distinctUntilChanged} from "rxjs/operators";

@Component({
    selector: 'fury-key-metrics',
    templateUrl: './key-metrics.component.html',
    styleUrls: ['./key-metrics.component.scss']
})
export class KeyMetricsComponent implements OnInit {
    data: ChartData;
    modelCommodity = new FormControl('modelCommodity');
    isLoading: boolean;

    selectedMetrics: KeyMetrics;
    dashboardMetrics: KeyMetrics[] = [];

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.loadMetrics();
        this.registerCommodityChange();
    }

    private loadMetrics() {
        this.isLoading = true;
        this.api.getDashboardMetrics().subscribe((metrics) => {
            this.dashboardMetrics = metrics;
            this.selectedMetrics = metrics[0];
            this.modelCommodity.setValue(metrics[0].type);
            setTimeout(() => {
                this.isLoading = false;
            }, 300);
        })
    }

    reload() {
        this.loadMetrics();
    }


    private registerCommodityChange() {
        this.modelCommodity.valueChanges.pipe(distinctUntilChanged())
            .subscribe(val => {
                if (val) {
                    this.selectedMetrics = this.dashboardMetrics.find(m => m.type === val);
                }
            })
    }
}
