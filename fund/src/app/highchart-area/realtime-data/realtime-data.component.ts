import { Component, OnInit, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FundBasicInfoService } from '../../fund-for-add/fund-basic-info.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-realtime-data',
  templateUrl: './realtime-data.component.html',
  styleUrls: ['./realtime-data.component.scss'],
  providers: [FundBasicInfoService,MdSnackBar]
})
export class RealtimeDataComponent implements OnInit, OnChanges {

  constructor(private mdSnackBar:MdSnackBar,private fundBasicInfoService: FundBasicInfoService, private route: ActivatedRoute, private router: Router) { }
  fundcode
  ngOnInit() {
    this.route.params.subscribe((value:any) => {
      this.initHightchart(value.id);
    });
  } 

  ngOnChanges() {
  }

  flag
  initHightchart(fondcode) {
    clearInterval(this.flag);
    let date = new Date();
    let hours = date.getHours()
    let minutes = date.getMinutes();
    if (this.time_range("9:30", "11:30", hours + ":" + minutes) || this.time_range("13:30", "15:30", hours + ":" + minutes)) {
    } else {
      this.mdSnackBar.open(`开放时间：上午：9:30-11:30,下午：13:30-15:30`, "关闭", {
        duration: 50000
      });
      return;
    }
    this.options = {
      chart: { type: 'spline' },
      title: { text: `实时数据(${fondcode})` },
      series: [
        {
          data: []
        }
      ]
    };
    this.fundBasicInfoService.get(fondcode).subscribe(d => {
      if (d.state == 1) {
        this.chart.series[0].addPoint([d.data.gztime, parseFloat(d.data.gsz)]);
      }
    });
    this.flag = setInterval(() => {
      this.fundBasicInfoService.get(fondcode).subscribe(d => {
        if (d.state == 1) {
          this.chart.series[0].addPoint([d.data.gztime, parseFloat(d.data.gsz)]);
        }
      });
    }, 1000 * 60);
  }
  options: Object
  chart: any
  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  time_range(beginTime, endTime, nowTime) {
    var strb = beginTime.split(":")
    if (strb.length != 2) {
      return false;
    }
    var stre = endTime.split(":");
    if (stre.length != 2) {
      return false;
    }

    var strn = nowTime.split(":");
    if (stre.length != 2) {
      return false;
    }
    var b = new Date();
    var e = new Date();
    var n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);
    n.setHours(strn[0]); n.setMinutes(strn[1]);

    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
      return true;
    } else {
      return false;
    }
  }
}
