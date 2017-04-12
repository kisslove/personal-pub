import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FundBasicInfoService } from './fund-basic-info.service';
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-fund-for-add',
  templateUrl: './fund-for-add.component.html',
  styleUrls: ['./fund-for-add.component.scss'],
  providers: [FundBasicInfoService, MdSnackBar]
})
export class FundForAddComponent implements OnInit {
  items: any[] = []
  constructor(private fundBasicInfoService: FundBasicInfoService, private mdSnackBar: MdSnackBar) { }
  ngOnInit() {
    this.items = window.localStorage['selectedFund'] ? JSON.parse(window.localStorage['selectedFund']) : [];
  }

  @Output()
  selectedFund: EventEmitter<string> = new EventEmitter<string>();
  emitDataToHighchart(item) {
    this.selectedFund.emit(item);
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

  refreshItems(code) {
    this.fundBasicInfoService.get(code).subscribe(d => {
      if (d.state == 1) {
        for (var value of this.items) {
          if (value.fundcode == code) {
            value = d.data;
            this.mdSnackBar.open("刷新成功", "关闭", {
              duration: 1000
            });
          }
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