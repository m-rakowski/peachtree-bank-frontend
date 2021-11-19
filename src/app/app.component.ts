import { Component, OnInit } from '@angular/core';
import { TransferService } from './transfer.service';
import { GlobalStateService } from './global-state.service';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private globalStateService: GlobalStateService) {}

  ngOnInit() {
    this.globalStateService.updateTransfers().subscribe();
    this.globalStateService.updateAccount().subscribe();
  }
}
