import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Stock } from '../../models/stock';
import { HighchartsService } from '../../services/highcharts.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {

  @Input() stock: Stock;

  @ViewChild('charts') public chartEl: ElementRef;

  loading = true;
  chart: Highcharts.Chart;
  options: Highcharts.Options;
  starSelected = false;

  chartOptions = {
    title: {
      text: ''
    },

    legend: {
      enabled: false
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2014
      }
    },
    series: [{
      name: '',
      data: []
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        }
      }]
    }
  };

  constructor(private highcharts: HighchartsService) { }

  public ngOnInit(): void {
    this.loading = false;

    for (let i = 0; i < 50; i++) {
      this.chartOptions.series[0].data.push(Math.floor(Math.random() * 160) + 170);
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.highcharts.createChart(this.chartEl.nativeElement, this.chartOptions);
  }

  onClickStarIcon(): void {
    this.starSelected = !this.starSelected;
  }



}
