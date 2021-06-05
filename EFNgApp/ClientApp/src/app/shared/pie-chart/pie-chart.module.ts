import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PieChartComponent} from "./pie-chart.component";
import {MaterialModule} from "../../../@fury/shared/material-components.module";
import {FurySharedModule} from "../../../@fury/fury-shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HighlightModule} from "../../../@fury/shared/highlightjs/highlight.module";
import {FuryCardModule} from "../../../@fury/shared/card/card.module";
import {BreadcrumbsModule} from "../../../@fury/shared/breadcrumbs/breadcrumbs.module";
import {LoadingOverlayModule} from "../../../@fury/shared/loading-overlay/loading-overlay.module";
import {ChartsModule} from "ng2-charts";


@NgModule({
    declarations: [PieChartComponent],
    exports: [
        PieChartComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FurySharedModule,
        ReactiveFormsModule,

        // Core
        HighlightModule,
        FuryCardModule,
        BreadcrumbsModule,
        LoadingOverlayModule,
        ChartsModule,
    ]
})
export class PieChartModule {
}
