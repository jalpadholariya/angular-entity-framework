import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalComponent } from './historical.component';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from '../../../@fury/shared/highlightjs/highlight.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { HistoricalRoutingModule } from './historical-routing.module';


@NgModule({
  declarations: [HistoricalComponent],
  imports: [
    CommonModule,
    HistoricalRoutingModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule,

    // Core
    HighlightModule,
    FuryCardModule,
    BreadcrumbsModule,
  ],
})
export class HistoricalModule { }
