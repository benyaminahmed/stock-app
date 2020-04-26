import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { IntradayPrice } from '../shared/models/intraday-price';
import { StockPrice } from '../shared/models/stock-price';
import { AlphaVantageService } from '../shared/services/alpha-vantage.service';


@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  stockPrices: StockPrice[];
  symbol: string;
  companyName: string;
  region: string;
  loading: boolean;
  intradayPrices: IntradayPrice[];
  series: 'Daily' | 'Intraday' = 'Daily';

  constructor(private alphaVantageSvc: AlphaVantageService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.symbol = params.symbol;
      this.companyName = params.name;
      this.region = params.region;
      this.getPrices(this.symbol);
    });
  }

  getPrices(symbol: string): void {

    this.stockPrices = null;
    this.loading = true;

    const getTimeSeriesDaily = this.alphaVantageSvc.getTimeSeriesDaily(symbol);
    const getTimeSeriesIntraday = this.alphaVantageSvc.getTimeSeriesIntraday(symbol);

    forkJoin([getTimeSeriesDaily, getTimeSeriesIntraday])
      .pipe(
        map(res => {
          this.stockPrices = this.mapStockPrices(res[0]);
          console.log(res[1]);
        }))
      .subscribe(() => {
        this.loading = false;
      },
        error => {
          console.log(error);
        }
      );
  }

  mapIntradayPrices(data: any): IntradayPrice[] {
    return null;
  }

  mapStockPrices(data: any): StockPrice[] {

    let res = null;
    if (data) {
      const prices = data['Time Series (Daily)'];

      if (prices) {
        res = new Array<StockPrice>();
        for (const [key, value] of Object.entries(prices)) {
          const date = new Date(key);
          const open = parseInt(value['1. open'], 10);
          const high = parseInt(value['2. high'], 10);
          const low = parseInt(value['3. low'], 10);
          const close = parseInt(value['4. close'], 10);
          const volume = parseInt(value['5. volume'], 10);

          res.push({
            date: new Date(date),
            open,
            high,
            low,
            close,
            volume
          } as StockPrice);
        }
      }
    }
    return res;
  }

  onClickChangeSeries(series: 'Daily' | 'Intraday') {
    this.series = series;
  }

}
