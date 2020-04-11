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
        pointStart: 830
      }
    },
    series: [{
      name: '',
      data: []
    }],
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        hour: '%H:%M'
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        }
      }]
    }
  };

  constructor(private highcharts: HighchartsService) { }

  ngOnInit(): void {
    this.loading = false;

    let h = 8;

    for (let i = 0; i < 12; i++) {
      const y = Math.floor(Math.random() * 160) + 170;
      this.chartOptions.series[0].data.push([Date.UTC(2020, 2, 3, h), y]);

      h++;
    }
  }

  ngAfterViewInit(): void {
    this.highcharts.createChart(this.chartEl.nativeElement, this.chartOptions);
  }

  onClickStarIcon(): void {
    this.starSelected = !this.starSelected;
  }
}


