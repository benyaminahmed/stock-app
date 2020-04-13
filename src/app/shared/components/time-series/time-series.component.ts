import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';

import { StockPrice } from '../../models/stock-price';
import { AlphaVantageService } from '../../services/alpha-vantage.service';

@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.scss']
})
export class TimeSeriesComponent implements OnInit {

  @Output() outputLoadStockPrices: EventEmitter<StockPrice[]> =
    new EventEmitter<StockPrice[]>();

  searchInput: string;
  searchForm: FormGroup;
  loading = false;
  stockPrices: StockPrice[];

  constructor(private alphaVantageSvc: AlphaVantageService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchCtrl: new FormControl('')
    });
  }

  onChangeSearchInput(e) {
    this.searchInput = e.currentTarget.value;
    this.stockPrices = null;
    this.loading = true;
    this.alphaVantageSvc
      .getTimeSeriesDaily(this.searchInput)
      .pipe(
        map(res => {
          this.stockPrices = this.mapStockPrices(res);
          this.outputLoadStockPrices.emit(this.stockPrices);
          this.loading = false;
        }))
      .subscribe();
  }

  mapStockPrices(data: any): StockPrice[] {

    const res = new Array<StockPrice>();

    if (data) {
      const prices = data['Time Series (Daily)'];

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
    return res;
  }

}
