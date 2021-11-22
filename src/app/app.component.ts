import { Component, OnInit } from '@angular/core';
import { MockedBackendService } from './modules/core/services/mocked-backend.service';
import { Transfer } from '../mock-data/transfer.model';
import { Store } from '@ngrx/store';
import { loadAllTransfersAction } from './store/actions/transfer.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<Transfer>,
    private mockedBackend: MockedBackendService
  ) {}

  async ngOnInit() {
    await this.mockedBackend.initDb();
    this.store.dispatch(loadAllTransfersAction());
  }
}
