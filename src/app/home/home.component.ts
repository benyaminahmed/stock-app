import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import * as moment from 'moment';

import { StockPrice } from '../shared/models/stock-price';
import { HighchartsService } from '../shared/services/highcharts.service';

const More = require('highcharts/highcharts-more');
More(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('charts') public chartEl: ElementRef;

  loading = true;
  chart: Highcharts.Chart;
  options: Highcharts.Options;
  starSelected = false;

  stockPrices: StockPrice[];

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
        }
      }
    },
    series: [{
      name: '',
      data: []
    }],
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
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

  onClickStarIcon(): void {
    this.starSelected = !this.starSelected;
  }

  onOutputLoadStockPrices(event) {
    this.stockPrices = event;

    const prices = _.take(_.orderBy(this.stockPrices, ['date'], ['desc']), 7);

    this.chartOptions.series[0].data = [];

    for (let i = 0; i < prices.length; i++) {
      const mmt = moment(prices[i].date).toDate();
      this.chartOptions.series[0].data.push(
        [
          Date.UTC(mmt.getFullYear(), mmt.getMonth(), mmt.getDate()),
          prices[i].open
        ]);
    }

    setTimeout(() => {
      this.highcharts.createChart(this.chartEl.nativeElement, this.chartOptions);
    }, 0);
  }
}


