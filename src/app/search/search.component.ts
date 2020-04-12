import { Component } from '@angular/core';

import { StockPrice } from '../shared/models/stock-price';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  stockPrices: StockPrice[];

  onOutputLoadStockPrices(event) {
    this.stockPrices = event;
  }

}
