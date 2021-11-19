import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { MakeTransferComponent } from './make-transfer/make-transfer.component';
import { ReviewTransferModalComponent } from './review-transfer-modal/review-transfer-modal.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorsPipe } from './errors-pipe';
import { CustomInputComponent } from './custom-input/custom-input.component';
import {CustomCurrencyInputComponent} from "./custom-currency-input/custom-currency-input.component";

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    MakeTransferComponent,
    ReviewTransferModalComponent,
    HeaderComponent,
    ErrorsPipe,
    CustomInputComponent,
    CustomCurrencyInputComponent
  ],
  imports: [
    BrowserModule,
    BbUIModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
