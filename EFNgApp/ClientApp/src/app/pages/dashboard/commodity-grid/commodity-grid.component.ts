import {Component, OnInit} from '@angular/core';
import {AllEnterpriseModules, ColDef} from "@ag-grid-enterprise/all-modules";
import {ApiService} from "../../../services/api.service";
import {DecimalPipe} from "@angular/common";

@Component({
    selector: 'fury-commodity-grid',
    templateUrl: './commodity-grid.component.html',
    styleUrls: ['./commodity-grid.component.scss']
})
export class CommodityGridComponent implements OnInit {

    private gridApi;
    private gridColumnApi;
    isLoading: boolean;
    columnDefs: ColDef[];
    rowData;
    allModules: any = AllEnterpriseModules;

    defaultColDef: ColDef;

    constructor(private api: ApiService, private decimalPipe: DecimalPipe) {
    }

    ngOnInit() {
        this.defaultColDef = this.getDefaultColDef();
        this.columnDefs = this.getColumnDefs();
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.loadData();
    }

    loadData() {
        this.isLoading = true;
        this.api.getGetModelCommodity().subscribe(data => {
            this.rowData = data;
            setTimeout(() => {
                this.gridColumnApi.autoSizeAllColumns();
                this.isLoading = false;
            }, 300);
        });
    }

    getStatusBar() {
        return {
            statusPanels: [
                {
                    statusPanel: 'agTotalAndFilteredRowCountComponent',
                    align: 'left'
                },
                {
                    statusPanel: 'agAggregationComponent',
                    statusPanelParams: {
                        aggFuncs: ['count', 'sum', 'min', 'max', 'avg']
                    }
                }
            ]
        }
    }

    private getDefaultColDef() {
        return {
            flex: 1,
            resizable: true,
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            minWidth: 100,
            // allow every column to be aggregated
            enableValue: true,
            // allow every column to be grouped
            enableRowGroup: true,
            // allow every column to be pivoted
            enablePivot: true,
            sortable: true,
        };
    }

    private getColumnDefs() {
        return <ColDef[]>[
            {field: 'type', type: 'select'},
            {field: 'date', type: 'date'},
            {field: 'contract', type: 'select'},
            {field: 'price', type: 'number', aggFunc: 'avg'},
            {field: 'position', type: 'selectNumber'},
            {field: 'newTradeAction', type: 'selectNumber'},
            {headerName: 'PnL Daily', field: 'pnLDaily', type: 'number', aggFunc: 'sum'},
            {headerName: 'Cumulative PnL', field: 'cumPnL', type: 'number', aggFunc: 'max'},
            {headerName: 'Drawdown PnL', field: 'drawdownPnL', type: 'number', aggFunc: 'max'}
        ];
    }

    columnTypes() {
        return {
            number: {
                cellStyle: {textAlign: 'right'},
                cellEditor: 'agTextCellEditor',
                filter: 'agNumberColumnFilter',
                valueFormatter: params => {
                    if (params?.data?.number) {
                        return this.decimalPipe.transform(params?.data?.number,  '1.2-2');
                    }
                },
            },
            selectNumber: {
                cellStyle: {textAlign: 'right'},
                cellEditor: 'agTextCellEditor',
                filter: 'agSetColumnFilter',
                valueFormatter: params => {
                    if (params?.data?.number) {
                        return this.decimalPipe.transform(params?.data?.number,  '1.2-2');
                    }
                },
            },
            select: {
                filter: 'agSetColumnFilter'
            },
            date: {
                valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : '',
            }
        }
    }
}
