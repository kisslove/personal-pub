import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-highchart-area',
  templateUrl: './highchart-area.component.html',
  styleUrls: ['./highchart-area.component.scss']
})
export class HighchartAreaComponent implements OnInit, OnChanges {
  @Input()
  selectedData: any
  constructor(private router:Router) {
  }

  ngOnInit() {
      this.selectedData=window.localStorage['selectedData'] ? JSON.parse(window.localStorage['selectedData']) :{};
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectedData.fundcode){
      this.router.navigate(['/fund', this.selectedData.fundcode]);
    }
      
  }
}