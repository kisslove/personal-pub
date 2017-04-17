import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RealtimeDataComponent } from './highchart-area/realtime-data/realtime-data.component';
import { HistoryDataComponent } from './highchart-area/history-data/history-data.component';
const highchartRoutes: Routes = [
  {
    path: 'fund/:id', redirectTo: "fund/:id/realtime"
  },
  { path: 'fund/:id/realtime', component: RealtimeDataComponent },
  { path: 'fund/:id/historydata', component: HistoryDataComponent }
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