import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ChartModule } from "angular2-highcharts";
import * as something  from 'highcharts';

import {MaterialModule} from '@angular/material';

import { AppComponent } from './app.component';
import { FundForAddComponent } from './fund-for-add/fund-for-add.component';
import { HighchartAreaComponent } from './highchart-area/highchart-area.component';
import {RealtimeDataComponent} from './highchart-area/realtime-data/realtime-data.component';
import{HistoryDataComponent}from './highchart-area/history-data/history-data.component';
import {AppRouterModule} from './app-router.module';
  
@NgModule({
  declarations: [
    AppComponent,
    FundForAddComponent,
    HighchartAreaComponent,
    RealtimeDataComponent,
    HistoryDataComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule.forRoot(something).ngModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRouterModule
  ],
  providers: [ChartModule.forRoot(something).providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
