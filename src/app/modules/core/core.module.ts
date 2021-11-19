import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { ReviewTransferModalComponent } from './components/review-transfer-modal/review-transfer-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorsPipe } from './pipes/errors-pipe';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomCurrencyInputComponent } from './components/custom-currency-input/custom-currency-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BbUIModule } from '../bb-ui/bb-ui.module';

@NgModule({
  declarations: [
    TransactionsListComponent,
    MakeTransferComponent,
    ReviewTransferModalComponent,
    HeaderComponent,
    ErrorsPipe,
    CustomInputComponent,
    CustomCurrencyInputComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, BbUIModule],
  exports: [HeaderComponent, TransactionsListComponent, MakeTransferComponent],
})
export class CoreModule {}
