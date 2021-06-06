import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../@fury/shared/material-components.module";
import {FurySharedModule} from "../../../@fury/fury-shared.module";
import {BreadcrumbsModule} from "../../../@fury/shared/breadcrumbs/breadcrumbs.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {HighlightModule} from "../../../@fury/shared/highlightjs/highlight.module";
import {FuryCardModule} from "../../../@fury/shared/card/card.module";
import { KeyMetricsComponent } from './key-metrics/key-metrics.component';
import {LoadingOverlayModule} from "../../../@fury/shared/loading-overlay/loading-overlay.module";
import {ChartsModule} from "ng2-charts";
import {PieChartModule} from "../../shared/pie-chart/pie-chart.module";
import {TimeChartModule} from "../../shared/time-chart/time-chart.module";
import {GridModule} from "../../shared/grid/grid.module";
import { HistoricalChartComponent } from './historical-chart/historical-chart.component';


@NgModule({
    declarations: [DashboardComponent, KeyMetricsComponent, HistoricalChartComponent],
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
        GridModule,
    ],
})
export class DashboardModule {
}
