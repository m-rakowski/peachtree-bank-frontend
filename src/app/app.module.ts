import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { BbUIModule } from './modules/bb-ui/bb-ui.module';
import { StoreModule } from '@ngrx/store';
import { TransferEffects } from './store/effects/transfer.effects';
import { EffectsModule } from '@ngrx/effects';
import { transfersReducers } from './store/reducers/transfer.reducers';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    CommonModule,
    CoreModule,
    BbUIModule,
    EffectsModule.forRoot([TransferEffects]),
    StoreModule.forRoot({ transfersFeature: transfersReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
