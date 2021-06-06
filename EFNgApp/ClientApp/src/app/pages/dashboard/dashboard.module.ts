import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../@fury/shared/material-components.module";
import {FurySharedModule} from "../../../@fury/fury-shared.module";
import {BreadcrumbsModule} from "../../../@fury/shared/breadcrumbs/breadcrumbs.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {HighlightModule} from "../../../@fury/shared/highlightjs/highlight.module";
import {FuryCardModule} from "../../../@fury/shared/card/card.module";
import {KeyMetricsComponent} from './key-metrics/key-metrics.component';
import {LoadingOverlayModule} from "../../../@fury/shared/loading-overlay/loading-overlay.module";
import {ChartsModule} from "ng2-charts";
import {PieChartModule} from "../../shared/pie-chart/pie-chart.module";
import {TimeChartModule} from "../../shared/time-chart/time-chart.module";
import {HistoricalChartComponent} from './historical-chart/historical-chart.component';
import {CommodityGridComponent} from './commodity-grid/commodity-grid.component';
import {AgGridModule} from "@ag-grid-community/angular";


@NgModule({
    declarations: [DashboardComponent, KeyMetricsComponent, HistoricalChartComponent, CommodityGridComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MaterialModule,
        FurySharedModule,
        ReactiveFormsModule,

        // Core
        HighlightModule,
        FuryCardModule,
        BreadcrumbsModule,
        LoadingOverlayModule,
        ChartsModule,
        PieChartModule,
        TimeChartModule,
        AgGridModule,
    ],
    providers: [DecimalPipe]
})
export class DashboardModule {
}
