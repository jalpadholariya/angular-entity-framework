import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LIST_FADE_ANIMATION } from '../../../../@fury/shared/list.animation';
import { Observable, ReplaySubject } from 'rxjs';
import { QuoteModel } from '../../../pages/grid/model/quote.model';
import { ApiService } from '../../../services/api.service';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'fury-toolbar-notifications',
    templateUrl: './toolbar-notifications.component.html',
    styleUrls: ['./toolbar-notifications.component.scss'],
    animations: [...LIST_FADE_ANIMATION],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarNotificationsComponent implements OnInit {

    subject$: ReplaySubject<QuoteModel[]> = new ReplaySubject<QuoteModel[]>(1);
    data$: Observable<QuoteModel[]> = this.subject$.asObservable();
    quotes: QuoteModel[];

    notifications: any[] = [];
    isOpen: boolean;

    constructor(private stockService: ApiService) {
    }

    ngOnInit() {
        this.getData().subscribe(quote => {
            // this.subject$.next(quote);
        });
        this.data$.pipe(
            filter(data => !!data)
        ).subscribe((quote) => {
            this.quotes = quote;
            this.notifications = quote.map(q => {
                return {
                    icon: 'notifications',
                    name: q.symbol + ' | USD ' + q.c + ' (' + q.priceVariation + ')',
                    time: moment(q.t * 1000).fromNow(),
                    read: false,
                    colorClass: ''
                };
            });
        });
    }

    getData() {
        return new Observable();
        // return this.messageService.notifications$;
    }

    markAsRead(notification) {
        notification.read = true;
    }

    dismiss(notification, event) {
        event.stopPropagation();
        this.notifications.splice(this.notifications.indexOf(notification), 1);
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    onClickOutside() {
        this.isOpen = false;
    }

    markAllAsRead() {
        this.notifications.forEach(notification => notification.read = true);
    }
}
