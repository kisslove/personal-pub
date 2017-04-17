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
  selectedData
  constructor(private fundBasicInfoService: FundBasicInfoService, private mdSnackBar: MdSnackBar) { }
  ngOnInit() {
    this.items = window.localStorage['selectedFund'] ? JSON.parse(window.localStorage['selectedFund']) : [];
    this.selectedData = this.items[0];
  }

  @Output()
  selectedFund: EventEmitter<string> = new EventEmitter<string>();
  emitDataToHighchart(item) {
    this.selectedData = item;
    window.localStorage['selectedData'] = JSON.stringify(item);
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
          this.mdSnackBar.open(`基金:${e.value}已存在`, "关闭", {
            duration: 1000
          });
        }
      }
    });
  }

  refreshItems(e, code) {
    e.stopPropagation();
    this.fundBasicInfoService.get(code).subscribe(d => {
      if (d.state == 1) {
        this.items = this.items.map(value => {
          if (value.fundcode == code) {
            return value = d.data;
          } else {
            return value;
          }
        });
        this.mdSnackBar.open("刷新成功", "关闭", {
          duration: 1000
        });
        window.localStorage['selectedFund'] = JSON.stringify(this.items);
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