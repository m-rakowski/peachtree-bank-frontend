import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransferService } from '../transfer.service';
import { Transfer } from '../../mock-data/transfer.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  items: Transfer[] = [];
  itemsFiltered: Transfer[] = [];

  constructor(private itemService: TransferService) {
    this.itemService.getAll().subscribe((items) => {
      this.items = items;
      this.itemsFiltered = items;
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
    this.itemsFiltered = this.items.filter((item) => {
      return item.merchant.name.toLowerCase().includes(term.toLowerCase());
    });
  }

  ngOnDestroy() {}
}
