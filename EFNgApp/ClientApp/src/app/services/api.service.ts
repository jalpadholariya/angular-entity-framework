import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    }

   /* public getSymbols(exchange: string): Observable<SymbolModel[]> {
            return this.http.get<SymbolModel[]>(`${environment.backend}/stock/symbol/${exchange}`);
        }

    public getQuote(symbol: string): Observable<QuoteModel> {
            return this.http.get<QuoteModel>(`${environment.backend}/quote/${symbol}`);
    }*/

    openSnackBar(message: string, action?: string, severity = '') {
        this._snackBar.open(message, action, {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: severity
        });
    }
}
