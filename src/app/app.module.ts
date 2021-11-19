import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { BbUIModule } from './modules/bb-ui/bb-ui.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    CommonModule,
    CoreModule,
    BbUIModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
