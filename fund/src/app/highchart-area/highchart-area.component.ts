import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FundBasicInfoService } from '../fund-for-add/fund-basic-info.service';
@Component({
  selector: 'app-highchart-area',
  templateUrl: './highchart-area.component.html',
  styleUrls: ['./highchart-area.component.scss'],
  providers: [FundBasicInfoService]
})
export class HighchartAreaComponent implements OnInit, OnChanges {
  @Input()
  selectedData: any
  constructor(private fundBasicInfoService: FundBasicInfoService) {
  }

  ngOnInit() {
   // this.currentFund=`http://j4.dfcfw.com/charts/pic6/000962.png?v=${Date.now()}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initHightchart(this.selectedData);
  }
  flag
 // currentFund
  initHightchart(fund) {
    clearInterval(this.flag);
   // this.currentFund=`http://j4.dfcfw.com/charts/pic6/${this.selectedData.fundcode}.png?v=${Date.now()}`
    this.options = {
      chart: { type: 'spline' },
      title: { text: '实时数据' },
      series: [
        {
          data: [[this.selectedData.gztime, parseFloat(this.selectedData.gsz)]]
        }
      ]
    };
    this.flag = setInterval(()=> {
      this.fundBasicInfoService.get(this.selectedData.fundcode).subscribe(d => {
        if (d.state == 1) {
          this.chart.series[0].addPoint([d.data.gztime, parseFloat(d.data.gsz)]);
        }
      })
    }, 1000*60);
  }
  options: Object
  chart: any
  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }



}