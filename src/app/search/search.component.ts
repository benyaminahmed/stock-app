import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { StockPrice } from '../shared/models/stock-price';
import { AlphaVantageService } from '../shared/services/alpha-vantage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private alphaVantageSvc: AlphaVantageService) {
  }

  searchInput: string;
  searchForm: FormGroup;
  loading = false;
  stockPrices: StockPrice[];

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchCtrl: new FormControl('')
    });
  }

  onChangeSearchInput(e) {
    this.loading = true;
    this.searchInput = e.currentTarget.value;
    this.alphaVantageSvc
      .getInstruments(this.searchInput)
      .pipe(
        map(res => {
          this.stockPrices = this.mapStockPrices(res);
          this.loading = false;
        }))
      .subscribe();
  }


  mapStockPrices(data: any): StockPrice[] {

    const res = new Array<StockPrice>();

    const prices = data['Time Series (Daily)'];

    for (const [key, value] of Object.entries(prices)) {
      const date = key;
      const open = value['1. open'];
      const high = value['2. high'];
      const low = value['3. low'];
      const close = value['4. close'];
      const volume = value['5. volume'];

      res.push({
        date: new Date(date),
        open,
        high,
        low,
        close,
        volume
      } as StockPrice);
    }
    return res;
  }
}
