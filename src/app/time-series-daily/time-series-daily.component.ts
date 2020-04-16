import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

import { StockPrice } from '../shared/models/stock-price';
import { AlphaVantageService } from '../shared/services/alpha-vantage.service';

@Component({
  selector: 'app-time-series-daily',
  templateUrl: './time-series-daily.component.html',
  styleUrls: ['./time-series-daily.component.scss']
})
export class TimeSeriesDailyComponent implements OnInit {

  constructor(private alphaVantageSvc: AlphaVantageService, public activatedRoute: ActivatedRoute) { }

  stockPrices: StockPrice[];
  symbol: string;
  companyName: string;

  loading: boolean;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.symbol = params.symbol;
      this.companyName = params.name;
      this.search(this.symbol);
    });
  }

  search(symbol: string) {
    this.stockPrices = null;
    this.loading = true;
    this.alphaVantageSvc
      .getTimeSeriesDaily(symbol)
      .pipe(
        map(res => {
          this.stockPrices = this.mapStockPrices(res);
          this.loading = false;
        }))
      .subscribe(
        error => {
          this.loading = false;
          console.log('error');
        });
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
          const volume = parseInt(value['5. volume'], 10); res.push({
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
}

