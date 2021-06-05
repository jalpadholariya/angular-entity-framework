import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreadcrumbsModule} from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import {ListModule} from '../../../@fury/shared/list/list.module';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {GridComponent} from './grid.component';
import {FurySharedModule} from '../../../@fury/fury-shared.module';
import {AgGridModule} from "ag-grid-angular";
import {HighlightModule} from "../../../@fury/shared/highlightjs/highlight.module";
import {FuryCardModule} from "../../../@fury/shared/card/card.module";
import {LoadingOverlayModule} from "../../../@fury/shared/loading-overlay/loading-overlay.module";
import {ChartsModule} from "ng2-charts";

@NgModule({
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
        AgGridModule.withComponents([])
    ],
    declarations: [GridComponent],
    exports: [GridComponent]
})
export class GridModule {
}
