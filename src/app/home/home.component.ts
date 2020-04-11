import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

import { HighchartsService } from '../shared/services/highcharts.service';

const More = require('highcharts/highcharts-more');
More(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit(): void {
    this.highcharts.createChart(this.chartEl.nativeElement, this.chartOptions);
  }

  onClickStarIcon(): void {
    this.starSelected = !this.starSelected;
  }
}


