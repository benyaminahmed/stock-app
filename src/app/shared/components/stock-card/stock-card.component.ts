import { Component, Input, OnInit } from '@angular/core';
import { color } from 'highcharts';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import * as moment from 'moment';

import { chartColours } from '../../helpers/colour';
import { StockPrice } from '../../models/stock-price';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {

  @Input() stockPrices: StockPrice[];
  @Input() symbol: string;
  @Input() companyName: string;
  @Input() region: string;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  chartVolumeOptions: Highcharts.Options;


  constructor() { }

  public ngOnInit(): void {
    const prices = _.take(_.orderBy(this.stockPrices, ['date'], ['desc']), 7);

    this.buildChart();

    const latestStockPrices = _.orderBy(this.stockPrices.slice(0, 30), 'date', 'asc');

    const volume = latestStockPrices.map(s => s.volume);
    const dates = latestStockPrices.map(s => moment(s.date).format('DD-MMM-YYYY'));

    this.buildVolumeChart(dates, volume);

    for (let i = 0; i < prices.length; i++) {
      const mmt = moment(prices[i].date).toDate();

      const setChartSeries = (type, index) => {
        // tslint:disable-next-line: no-string-literal
        this.chartOptions.series[index]['data'].push(
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
  }

  buildVolumeChart(categories, data): void {
    this.chartVolumeOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Volume'
        }
      },
      series: [{
        name: 'Volume',
        data,
        type: 'column'
      }]
    };
  }

  buildChart(): void {

    this.chartOptions = {
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

    const createChartSeries = (name, colour) => {
      this.chartOptions.series.push({
        name,
        data: [],
        color: colour,
        type: 'line'
      });
    };

    createChartSeries('Open', chartColours.blue);
    createChartSeries('Close', chartColours.red);
    createChartSeries('High', chartColours.green);
    createChartSeries('Low', chartColours.purple);
  }
}
