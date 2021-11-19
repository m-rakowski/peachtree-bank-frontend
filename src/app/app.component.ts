import { Component, OnInit } from '@angular/core';
import { TransferService } from './modules/core/services/transfer.service';
import { GlobalStateService } from './modules/core/services/global-state.service';
import { AccountService } from './modules/core/services/account.service';

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
