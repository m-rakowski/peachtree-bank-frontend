import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transfer } from '../../mock-data/transfer.model';
import { GlobalStateService } from '../global-state.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  transfers: Transfer[] = [];
  transfersFiltered: Transfer[] = [];

  constructor(private globalStateService: GlobalStateService) {
    this.globalStateService.transfers.subscribe((transfers) => {
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

  ngOnInit(): void {}

  search(term: string) {
    this.transfersFiltered = this.transfers.filter((transfer) => {
      return transfer.merchant.name?.toLowerCase().includes(term.toLowerCase());
    });
  }

  ngOnDestroy() {}
}
