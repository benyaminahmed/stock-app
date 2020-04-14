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
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      x: 0,
      y: 100
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      }
    },
    series: [],
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
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
    this.chartOptions.series = [];

    const prices = _.take(_.orderBy(this.stockPrices, ['date'], ['desc']), 7);

    const createChartSeries = (type) => {
      this.chartOptions.series.push({
        name: type,
        data: []
      });
    };

    createChartSeries('Open');
    createChartSeries('Close');
    createChartSeries('High');
    createChartSeries('Low');

    for (let i = 0; i < prices.length; i++) {
      const mmt = moment(prices[i].date).toDate();

      const setChartSeries = (type, index) => {
        this.chartOptions.series[index].data.push(
          [
            Date.UTC(mmt.getFullYear(), mmt.getMonth(), mmt.getDate()),
            prices[i][type.toLowerCase()]
          ]);
      };
      setChartSeries('Open', 0);
      setChartSeries('Close', 1);
      setChartSeries('High', 2);
      setChartSeries('Low', 3);
    }

    setTimeout(() => {
      this.highcharts.createChart(this.chartEl.nativeElement, this.chartOptions);
    }, 0);
  }

  onOutputLoadCompanies($event) {

  }
}


