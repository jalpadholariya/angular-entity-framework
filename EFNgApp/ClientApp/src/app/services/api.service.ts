import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {KeyMetrics} from "../pages/dashboard/data-model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    }

    public getDashboardMetrics(): Observable<KeyMetrics[]> {
        return this.http.get<KeyMetrics[]>(`${environment.backend}/GetDashboardData`);
    }

    public getPnLByModelCommodity(): Observable<Record<any, any>[]> {
        return this.http.get<Record<any, any>[]>(`${environment.backend}/GetPnLByModelCommodity`);
    }
    
    openSnackBar(message: string, action?: string, severity = '') {
        this._snackBar.open(message, action, {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: severity
        });
    }
}
