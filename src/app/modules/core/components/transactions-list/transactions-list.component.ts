import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transfer } from '../../../../../mock-data/transfer.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/model/app-state';
import { selectTransfers } from '../../../../store/selectors/transfer.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  transfers: Transfer[] = [];
  transfersFiltered: Transfer[] = [];

  private onDestroySubject = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectTransfers)
      .pipe(takeUntil(this.onDestroySubject))
      .subscribe((transfers) => {
        this.transfers = transfers;
        this.transfersFiltered = transfers;
      });
  }

  trackByFn(index: number, item: Transfer) {
    return index; // or item.id
  }

  asItem(item: Transfer): Transfer {
    return item;
  }

  search(term: string) {
    this.transfersFiltered = this.transfers.filter((transfer) => {
      return transfer.merchant.name?.toLowerCase().includes(term.toLowerCase());
    });
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(null);
  }
}
