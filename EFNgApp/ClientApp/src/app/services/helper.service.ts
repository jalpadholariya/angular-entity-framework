import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    static getTimeChartYAxis() {
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
    