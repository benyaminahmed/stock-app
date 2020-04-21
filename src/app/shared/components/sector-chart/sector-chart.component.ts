import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { sectorColours } from '../../helpers/colour';
import { Sector } from '../../models/sector';

@Component({
  selector: 'app-sector-chart',
  templateUrl: './sector-chart.component.html',
  styleUrls: ['./sector-chart.component.scss']
})
export class SectorChartComponent implements OnInit {

  @Input() sectors: Sector[];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor() { }

  ngOnInit(): void {
    const series = [];
    const categories = this.sectors.map(x => x.name);

    categories.forEach(c => {
      const data = [];
      data.push(parseFloat(this.sectors.find(s => s.name === c).value));
      series.push({
        name: c,
        data,
        color: sectorColours[c]
      });
    });

    this.buildChart(series, categories);
  }

  buildChart(series, categories): void {
    this.chartOptions = {
      chart: {
        type: 'bar'
      },
      title: {
        text: ''
      },
      yAxis: {
        visible: false,
        gridLineWidth: 0,
        title: {
          text: null
        }
      },
      xAxis: {
        categories,
        visible: false,
        gridLineWidth: 0,
        title: {
          text: null
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series
    };
  }
}
