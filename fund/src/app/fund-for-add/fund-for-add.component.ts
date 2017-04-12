import { Component, OnInit } from '@angular/core';
import { FundBasicInfoService } from './fund-basic-info.service';
@Component({
  selector: 'app-fund-for-add',
  templateUrl: './fund-for-add.component.html',
  styleUrls: ['./fund-for-add.component.scss'],
  providers: [FundBasicInfoService]
})
export class FundForAddComponent implements OnInit {
  items: any[] = []
  constructor(private fundBasicInfoService: FundBasicInfoService) { }
  ngOnInit() {
    this.items = window.localStorage['selectedFund'] ? JSON.parse(window.localStorage['selectedFund']) : [];
  }
  add(e) {
    this.fundBasicInfoService.get(e.value).subscribe(d => {
      if (d.state == 1) {
        if (this.confirmUnique(e.value)) {
          this.items.push(d.data);
          window.localStorage['selectedFund'] = JSON.stringify(this.items);
          e.value = "";
        } else {
          alert(`基金:${e.value}已存在`);
        }
      }
    });
  }

  confirmUnique(code) {
    for (var value of this.items) {
      if (value.fundcode == code) {
        return false;
      }
    }
    return true;
  }
}