import { Component, OnInit } from '@angular/core';
import { FundBasicInfoService } from '../../fund-for-add/fund-basic-info.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-history-data',
  templateUrl: './history-data.component.html',
  styleUrls: ['./history-data.component.scss'],
  providers: [FundBasicInfoService]
})
export class HistoryDataComponent implements OnInit {

  constructor(private fundBasicInfoService: FundBasicInfoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.initGridchart(value.id);
    });
  }
  initGridchart(fondcode) {
    this.fundBasicInfoService.getHistory(fondcode).subscribe(d => {
      if (d.state == 1) {
        document.write(eval('('+d.data+')').content);
        
      }
    });
  }
}
