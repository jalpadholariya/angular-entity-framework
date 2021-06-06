import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../services/api.service";

@Component({
    selector: 'fury-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    /**
     * Needed for the Layout
     */
    private _gap = 16;
    gap = `${this._gap}px`;

    pieCommodityData$: Observable<Record<any, any>[]>;

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.initPieCommodity();
    }

    initPieCommodity() {
        this.pieCommodityData$ = this.api.getPnLByModelCommodity();
    }

    col(colAmount: number) {
        return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
    }
}
