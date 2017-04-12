import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ChartModule} from "angular2-highcharts";

import {MaterialModule} from '@angular/material';


import { AppComponent } from './app.component';
import { FundForAddComponent } from './fund-for-add/fund-for-add.component';
import { HighchartAreaComponent } from './highchart-area/highchart-area.component';

@NgModule({
  declarations: [
    AppComponent,
    FundForAddComponent,
    HighchartAreaComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
