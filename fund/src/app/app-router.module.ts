import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RealtimeDataComponent} from './highchart-area/realtime-data/realtime-data.component';
const highchartRoutes: Routes = [
   { path: 'fund/:id/realtime', component: RealtimeDataComponent }
];
@NgModule({ 
  imports: [
    RouterModule.forRoot(highchartRoutes)
  ],
  exports: [
    RouterModule
  ]
}) 
export class AppRouterModule { }