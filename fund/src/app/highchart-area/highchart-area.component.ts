import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-highchart-area',
  templateUrl: './highchart-area.component.html',
  styleUrls: ['./highchart-area.component.scss']
})
export class HighchartAreaComponent implements OnInit, OnChanges {
  @Input()
  selectedData:Object
  options:Object
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectedData);
    this.initHightchart();
  }

  initHightchart() {
    this.options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares at a specific website, 2014'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        data: [
          { name: 'Microsoft Internet Explorer', y: 56.33 },
          { name: 'Chrome', y: 24.03 },
          { name: 'Firefox', y: 10.38 },
          { name: 'Safari', y: 4.77 },
          { name: 'Opera', y: 0.91 },
          { name: 'Proprietary or Undetectable', y: 0.2 }
        ]
      }]
    }
  }

}