import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { StockPrice } from '../../models/stock-price';
import { HighchartsService } from '../../services/highcharts.service';

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

  @ViewChild('charts') public chartEl: ElementRef;

  chart: Highcharts.Chart;
  options: Highcharts.Options;
  starSelected = false;

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

  public ngOnInit(): void {
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

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.highcharts.createChart(this.chartEl.nativeElement, this.chartOptions);
  }

  onClickStarIcon(): void {
    this.starSelected = !this.starSelected;
  }



}
